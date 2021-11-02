module.exports = {
  configureWebpack: {
    // externals: {
    //   firebase: "firebase",
    //   vuefire: "vuefire",
    //   quasar: "quasar",
    // },
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
