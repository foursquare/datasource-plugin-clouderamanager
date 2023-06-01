<!-- This README file is going to be the one displayed on the Grafana.com website for your plugin -->

Cloudera Manager Datasource for Grafana 9.x
===========================================

This plugin for [Grafana](http://grafana.org) provides a basic datasource for querying metrics
available in Cloudera Manager through its "tsquery" language. It supports Cloudera Manager API
versions v4 and higher.

This project is open source pursuant to the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
It is copyright (C) 2015-2016 by Foursquare Labs, Inc.


Installation
------------

The easiest way to install this plugin is with `grafana-cli`. Just run the following command:

```
grafana-cli plugins install foursquare-clouderamanager-datasource
```

Configuration
-------------

1. Add a new datasource and choose "Cloudera Manager" as the type.

2. Fill in the "URL" and other server parameters.

3. Click "Test Connection" to verify that you entered the information correctly.

4. Set "API Version" to match the API version reported by Test Connection.

5. Click "Save".

Queries
-------

Use this datasource just like you would use any other datasource. Fill in a "tsquery"
metric query in the input box and you should see metrics.

This datasource is very minimal and so there is no autocompletion support.

Read the [tsquery documentation](https://www.cloudera.com/documentation/enterprise/latest/topics/cm_dg_tsquery.html)
to learn more about tsquery.


Contributors
------------

- Tom Dyas
- Prasanthi Gandham

