## Contributing to the Plugin

### Set up your environment

To discover plugins, Grafana scans a plugin directory, the location of which depends on your operating system.

   1. Create a directory called `grafana-plugins` in your preferred workspace.

   2. Find the plugins property in the Grafana configuration file and set the plugins property to the path of your grafana-plugins directory. Refer to the [Grafana configuration documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#plugins) for more information.

      ```
        [paths]
        plugins = "/path/to/grafana-plugins"
      ```

   3. Restart Grafana if it’s already running, to load the new configuration.

#### Using Docker
  1. To set up Grafana for plugin development using Docker, run the following command:
      ```
      docker run -d -p 3000:3000 -v "$(pwd)"/grafana-plugins:/var/lib/grafana/plugins --name=grafana grafana/grafana:7.0.0
      ```

  2. Since Grafana only loads plugins on start-up, you need to restart the container whenever you add or remove a plugin.

      ```
     docker restart grafana
     ```

Or Follow the [Grafana's tutorial](https://grafana.com/tutorials/build-a-data-source-plugin/#set-up-your-environment)


### To Compile the data source

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   yarn dev
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

4. Run the tests (using Jest)

   ```bash
   # Runs the tests and watches for changes, requires git init first
   yarn test

   # Exits after running all the tests
   yarn test:ci
   ```

5. Spin up a Grafana instance and run the plugin inside it (using Docker)

   ```bash
   yarn server
   ```

6. Run the E2E tests (using Cypress)

   ```bash
   # Spins up a Grafana instance first that we tests against
   yarn server

   # Starts the tests
   yarn e2e
   ```

7. Run the linter

   ```bash
   yarn lint

   # or

   yarn lint:fix
   ```



## Learn more

Below you can find source code for existing app plugins and other related documentation.

- [Basic data source plugin example](https://github.com/grafana/grafana-plugin-examples/tree/master/examples/datasource-basic#readme)
- [Plugin.json documentation](https://grafana.com/docs/grafana/latest/developers/plugins/metadata/)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
