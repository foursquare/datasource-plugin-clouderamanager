'use strict';

System.register(['app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var QueryCtrl, ClouderaManagerQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
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

      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }],
    execute: function () {
      _export('ClouderaManagerQueryCtrl', ClouderaManagerQueryCtrl = function (_QueryCtrl) {
        _inherits(ClouderaManagerQueryCtrl, _QueryCtrl);

        /** @ngInject **/

        function ClouderaManagerQueryCtrl($scope, $injector) {
          _classCallCheck(this, ClouderaManagerQueryCtrl);

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClouderaManagerQueryCtrl).call(this, $scope, $injector));

          if (_this.target) {
            _this.target.target = _this.target.target || '';
          }
          return _this;
        }

        return ClouderaManagerQueryCtrl;
      }(QueryCtrl));

      _export('ClouderaManagerQueryCtrl', ClouderaManagerQueryCtrl);

      ClouderaManagerQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
