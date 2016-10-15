'use strict';

System.register(['./datasource', './query_ctrl'], function (_export, _context) {
  "use strict";

  var ClouderaManagerDatasource, ClouderaManagerQueryCtrl, ClouderaManagerMetricsQueryOptions, ClouderaManagerConfigView;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
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

      ClouderaManagerDatasource = _datasource.ClouderaManagerDatasource;
    }, function (_query_ctrl) {
      ClouderaManagerQueryCtrl = _query_ctrl.ClouderaManagerQueryCtrl;
    }],
    execute: function () {
      _export('QueryOptionsCtrl', ClouderaManagerMetricsQueryOptions = function ClouderaManagerMetricsQueryOptions() {
        _classCallCheck(this, ClouderaManagerMetricsQueryOptions);
      });

      ClouderaManagerMetricsQueryOptions.templateUrl = 'partials/query.options.html';

      _export('ConfigCtrl', ClouderaManagerConfigView = function ClouderaManagerConfigView() {
        _classCallCheck(this, ClouderaManagerConfigView);
      });

      ClouderaManagerConfigView.templateUrl = 'partials/config.html';

      _export('Datasource', ClouderaManagerDatasource);

      _export('ConfigCtrl', ClouderaManagerConfigView);

      _export('QueryCtrl', ClouderaManagerQueryCtrl);

      _export('QueryOptionsCtrl', ClouderaManagerMetricsQueryOptions);
    }
  };
});
//# sourceMappingURL=module.js.map
