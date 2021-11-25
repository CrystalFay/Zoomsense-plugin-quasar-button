# Zoomsense Pluign - Slides

- Functions folder has the firebase functions in

- App folder has the UI controls in (vue-cli-service build --target lib src/library.js) to generate output files into the dist dir (notes for CI)

- package.json has metadata on the plugin

## Local Development

Install dependencies:

```
cd app
npm install
```

Under `app/vue.config.js`, we specifically exclude Firebase-related dependencies from the output bundles. To run the plugin app locally, please comment the following line from the file:

```
configureWebpack: {
    // externals: [/^firebase\/.+$/, /^vuefire\/.+$/],
},
```

To run the app locally:

```
npm run serve
```
