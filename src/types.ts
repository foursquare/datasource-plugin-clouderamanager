import {DataQuery, DataSourceJsonData} from '@grafana/data';

export interface ClouderaManagerQuery extends DataQuery {
  queryText?: string;
}

/**
 * These are options configured for each DataSource instance
 */
export interface ClouderaManagerDataSourceOptions extends DataSourceJsonData {
  cmApiVersion?: string;
}
