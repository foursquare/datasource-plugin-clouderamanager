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

// This file has been modified as part of migrating to React for compatibility with Grafana 10.
// Modifications copyright (c) 2023 Cloudera, Inc.

import {DataSourcePlugin} from '@grafana/data';
import {ClouderaManagerDataSource} from './datasource';
import {ConfigEditor} from './components/ConfigEditor';
import {QueryEditor} from './components/QueryEditor';
import {ClouderaManagerQuery, ClouderaManagerDataSourceOptions} from './types';

export const plugin = new DataSourcePlugin<ClouderaManagerDataSource, ClouderaManagerQuery, ClouderaManagerDataSourceOptions>(ClouderaManagerDataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
