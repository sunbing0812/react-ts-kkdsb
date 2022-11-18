module.exports = {
    devServer: {
      proxy: {
        "/api": {
            target: "https://www.mxnzp.com",
            changeOrigin: true,
        },
        "/myapi":{
          target: "http://hn216.api.yesapi.cn",
          changeOrigin: true,
          pathRewrite:{
            '^/myapi': '' 
          }
        }
    }
    }
  }