import React, {ChangeEvent} from 'react';
import {Input} from '@grafana/ui';
import {QueryEditorProps} from '@grafana/data';
import {ClouderaManagerDataSource} from '../datasource';
import {ClouderaManagerDataSourceOptions, ClouderaManagerQuery} from '../types';

type Props = QueryEditorProps<ClouderaManagerDataSource, ClouderaManagerQuery, ClouderaManagerDataSourceOptions>;

export function QueryEditor({query, onChange, onRunQuery}: Props) {
  const onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({...query, queryText: event.target.value});
    // executes the query
    onRunQuery();
  };

  const {queryText} = query;

  return (
    <div className="gf-form">
      <Input name="query" required onChange={onQueryTextChange} value={queryText || ''}/>
    </div>
  );
}
