module.exports = {
  css: {
    extract: false,
  },
  configureWebpack: {
    // externals: [/^quasar\/.+$/, /^firebase\/.+$/, /^core-js\/.+$/],
    externals: [/^quasar\/.+$/, /^firebase\/.+$/],
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
