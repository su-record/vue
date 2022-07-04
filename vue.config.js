const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { VUE_APP_PORT, NODE_ENV } = process.env;
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "assets",
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
    config.module.rule("images").set("parser", {
      dataUrlCondition: {
        maxSize: 4 * 1024,
      },
    });
  },
  configureWebpack: config => {
    if (NODE_ENV === "production") {
      config.mode = "production";
      // config.output.filename = 'js/[name].[hash].js'
      // config.output.chunkFilename = 'js/[name].[hash].js'
    } else {
      config.mode = "development";
    }
  },
  css: {
    extract: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/override.scss";
        `,
      },
    },
  },
  devServer: {
    // port: VUE_APP_PORT,
    hot: true,
  },
});
