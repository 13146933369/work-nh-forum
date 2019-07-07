module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    proxy: {
      // 配置跨域
      "/apis": {
        target: "https://nhtiny.mtadservice.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/apis": ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
