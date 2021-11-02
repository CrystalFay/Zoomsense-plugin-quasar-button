module.exports = {
  css: {
    extract: false,
  },
  configureWebpack: {
    externals: [/^quasar\/.+$/, /^firebase\/.+$/, /^core-js\/.+$/],
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
