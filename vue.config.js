const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,




  //代理服务
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/test/main-menu':{
        target:'http://localhost:8899',
        pathRewrite:{'^/test':''},
        ws:true,
        changeOrigin:true,
      },
      '/test/all-menu':{
        target:'http://localhost:8899',
        pathRewrite:{'^/test':''},
        ws:true,
        changeOrigin:true,
      },
      '/test/system':{
        target:'http://localhost:8899',
        pathRewrite:{'^/test':''},
        ws:true,
        changeOrigin:true,
      }
    }
  }
})

