// Copyright 2016 Foursquare Labs, Inc.
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
define([
  './datasource',
  './query_ctrl',
],
function (ClouderaManagerDatasource) {
  'use strict';

  function ClouderaManagerMetricsQueryEditor() {
    return {
      controller: 'ClouderaManagerQueryCtrl',
      templateUrl: 'public/plugins/clouderamanager/partials/query.editor.html'
    };
  }

  function ClouderaManagerMetricsQueryOptions() {
    return {templateUrl: 'public/plugins/clouderamanager/partials/query.options.html'};
  }

  function ClouderaManagerConfigView() {
    return {templateUrl: 'public/plugins/clouderamanager/partials/config.html'};
  }

  return {
    Datasource:               ClouderaManagerDatasource,
    metricsQueryEditor:       ClouderaManagerMetricsQueryEditor,
    metricsQueryOptions:      ClouderaManagerMetricsQueryOptions,
    configView:               ClouderaManagerConfigView,
  };
});
