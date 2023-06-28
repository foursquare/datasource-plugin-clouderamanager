// Copyright 2015 Foursquare Labs, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This file has been modified as part of migrating to React for compatibility with Grafana 10.
// Modifications copyright (c) 2023 Cloudera, Inc.

import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings, FieldType, MutableDataFrame
} from '@grafana/data';

import {ClouderaManagerQuery, ClouderaManagerDataSourceOptions} from './types';
import {BackendSrvRequest, getBackendSrv, getTemplateSrv} from '@grafana/runtime';
import {lastValueFrom} from 'rxjs';

export class ClouderaManagerDataSource extends DataSourceApi<ClouderaManagerQuery, ClouderaManagerDataSourceOptions> {

  url?: string;
  basicAuth?: string;
  apiVersion: number;

  constructor(instanceSettings: DataSourceInstanceSettings<ClouderaManagerDataSourceOptions>) {
    super(instanceSettings);
    this.url = instanceSettings.url;
    this.basicAuth = instanceSettings.basicAuth;
    this.apiVersion = 4;
    if (instanceSettings.jsonData.cmApiVersion === 'v6-10') {
      this.apiVersion = 6;
    } else if (instanceSettings.jsonData.cmApiVersion === 'v11+') {
      this.apiVersion = 11;
    }
  }

  // Query for metric targets within the specified time range.
  query(options: DataQueryRequest<ClouderaManagerQuery>): Promise<DataQueryResponse> {
    const {range} = options;
    const dataPromises = options.targets
      .filter(function (target) {
        return target.queryText && !target.hide;
      })
      .map((target) => {
        let url = '/api/v' + this.apiVersion + '/timeseries';
        let query = {
          query: getTemplateSrv().replace(target.queryText, options.scopedVars),
          from: range!.from.toISOString(),
          to: range!.to.toISOString(),
          contentType: "application/json",
        };
        let requestOptions;
        if (this.apiVersion >= 11) {
          // Use POST method on API versions 11 and higher
          // Parameters are passed via the body. This allows longer `tsquery` queries.
          requestOptions = {
            method: 'POST',
            url: url,
            data: query
          };
        } else {
          // Use GET method for API versions prior to 11
          // Parameters are passed via query string.
          requestOptions = {
            method: 'GET',
            url: url,
            params: query
          };
        }

        const result = this.doRequest(requestOptions).then((response: any) => {
          if (!response || !response.data || !response.data.items) {
            return [];
          }
          const convertResponse = this.convertResponse(response);
          return convertResponse;
        });

        return result;
      });

    return Promise.all(dataPromises.values()).then((response) => {
      const frames = ([] as DataFrame[]).concat(...response);
      return {data: frames};
    });
  }

  // Test the connection to Cloudera Manager by querying for the supported API version.
  async testDatasource() {
    let options = {
      url: '/api/version',
    }

    return this.doRequest(options).then((response) => {
      //handling errors for the undefined response received
      if(response === undefined){
        return {
          status: "error",
          message: "Data source returned an undefined response",
          title: "Error"
        }
      }

      // ensuring that the response matches the pattern `^v\d+`
      let pattern = /^v\d+/;
      let data: string = (response.data as string);
      if(!(response.ok) || !(pattern.test(data))){
        return {
          status: "error",
          message: response.data,
          title: "Error"
        }
      }

      return {
        status: "success",
        message: "Data source is working. API version is '" + response.data + "'.",
        title: "Success"
      };
    });
  }

  // Helper to make API requests to Cloudera Manager. To avoid CORS issues, the requests may be proxied
  // through Grafana's backend via `getBackendSrv().fetch().
  async doRequest(options: BackendSrvRequest) {
    options.url = this.url + options.url;
    options.method = options.method || 'GET';
    if (this.basicAuth) {
      options.headers = {
        "Authorization": this.basicAuth
      };
    }
    const result = getBackendSrv().fetch(options);
    let response;
    try {
      response = await lastValueFrom(result);
    } catch(e) {
      // Grafana <= 8.1 uses rxjs 6. Which doesn't support lastValueFrom, and throws an Error.
      // It could be replaced by toPromise.
      response = result.toPromise();
    }
    return response;
  }

  // Convert the metadata returned from Cloudera Manager into the TimeSeries name for Grafana.
  makeTimeSeriesName(metadata: any): string {
    // metadata.alias contains the alias provided in query
    if (metadata.alias) {
      let alias = metadata.alias;
      if (metadata.metricName) {
        alias = alias.replace('%metricName%', metadata.metricName);
      }
      if (metadata.entityName) {
        alias = alias.replace('%entityName%', metadata.entityName);
      }
      return alias;
    } else if (metadata.metricName && metadata.entityName) {
      return metadata.metricName + ' (' + metadata.entityName + ')';
    } else if (metadata.metricName) {
      return metadata.metricName;
    } else if (metadata.entityName) {
      return metadata.entityName;
    }
    return 'UNKNOWN NAME';
  }

  // Convert the Cloudera Manager response to the format expected by Grafana.
  //
  // Grafana generally expects:
  // { data:
  //    [
  //      { name: 'metricName1',
  //        fields: [
  //          // interface Field<T = any, V = Vector<T>>
  //          { name: "Time",
  //            type: FieldType.time,
  //            values: [ts-a1, ts-a2, ts-a3]
  //          }
  //          { name: "Value",
  //            type: FieldType.number,
  //            values: [a1, a2, a3]
  //          }
  //        ]
  //       },
  //      { name: 'metricName2',
  //        fields: [
  //          { name: "Time",
  //            type: FieldType.time,
  //            values: [ts-b1, ts-b2, ts-b3]
  //          }
  //          { name: "Value",
  //            type: FieldType.number,
  //            values: [b1, b2, b3]
  //          }
  //        ]
  //       }
  //    ]
  // }
  //
  // The CM API response has the general form:
  // items: {
  //   timeSeries: [
  //     {
  //       metadata: {
  //         metricName: "metricName1",
  //         entityName: "entityName1",
  //         ...
  //       },
  //       data: [
  //         {
  //           value: 45.1234,
  //           timestamp: "2015-10-02T12:58:24.009Z",
  //           ...
  //         }, {
  //           value: 98.7654,
  //           timestamp: "2015-10-02T12:59:24.009Z",
  //           ...
  //         }
  //         ... (more datapoints)
  //       ]
  //     }
  //     ... (more timeseries)
  //   ]
  // }
  convertResponse(response: any): DataFrame[] {
    let frames: DataFrame[] = [];
    (response.data.items).forEach((item: any) => {
      (item.timeSeries).forEach((timeSeries: any) => {
        const frame = new MutableDataFrame({
          fields: [
            {name: "Time", type: FieldType.time},
            {name: "Value", type: FieldType.number},
          ],
        });
        timeSeries.data.map((point: any) => {
          frame.appendRow([point.timestamp, point.value]);
        });
        frame.name = this.makeTimeSeriesName(timeSeries.metadata);
        frames.push(frame);
      });
    });
    return frames;
  }
}
