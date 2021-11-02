module.exports = {
  css: {
    extract: false,
  },
  configureWebpack: {
    externals: {
      quasar: /^quasar$/i,
    },
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
