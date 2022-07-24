const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src/'));
    config.module.rule('images').set('parser', {
      dataUrlCondition: {
        maxSize: 4 * 1024,
      },
    });
  },
  devServer: {
    // port: VUE_APP_PORT,
    hot: true,
  },
});
