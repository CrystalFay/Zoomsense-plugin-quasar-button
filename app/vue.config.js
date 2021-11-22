module.exports = {
  css: {
    extract: false,
  },
  configureWebpack: {
    // externals: [/^quasar\/.+$/, /^firebase\/.+$/, /^core-js\/.+$/],
    externals: [/^firebase\/.+$/, /^vuefire\/.+$/],
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },

  transpileDependencies: ['quasar'],
};
