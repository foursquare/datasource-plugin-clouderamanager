import React, {useState} from 'react';
import {DataSourceHttpSettings, InlineLabel, Select} from '@grafana/ui';
import {DataSourcePluginOptionsEditorProps, SelectableValue} from '@grafana/data';
import {ClouderaManagerDataSourceOptions} from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<ClouderaManagerDataSourceOptions> {
}

export function ConfigEditor(props: Props) {
  const {onOptionsChange, options} = props;

  const [value, setValue] = useState<SelectableValue<number>>();
  const cmVersionOptions = [
    {label: 'v4-5', value: 0},
    {label: 'v6-10', value: 1},
    {label: 'v11+', value: 2},
  ];

  const onCmApiVersionChange = (value?: string) => {
    const jsonData = {
      ...options.jsonData,
      cmApiVersion: value,
    };
    onOptionsChange({...options, jsonData});
  };

  return (
    <div className="gf-form-group">
      <DataSourceHttpSettings
        defaultUrl={options.url}
        dataSourceConfig={options}
        showAccessOptions={true}
        onChange={onOptionsChange}
      />

      <h5>Cloudera Manager Settings</h5>
      <div className="gf-form-group">
        <div className="gf-form">
          <InlineLabel width={26}>
            CM API Version
          </InlineLabel>
          <Select
            width={40}
            options={cmVersionOptions}
            value={value}
            onChange={(v) => {
              setValue(v);
              onCmApiVersionChange(v.label);
            }}
          />
        </div>
      </div>

    </div>
    // </>
  );
}
