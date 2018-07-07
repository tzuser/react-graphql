const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
const {ReactLoadablePlugin}=require('react-loadable/webpack');
const configBase = require('./webpack.base.js');
const merge=require('webpack-merge');
//获取本机ip
function getIPAdress(){  
  //return '192.168.56.1'
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                    return alias.address;  
               }  
          }  
    }
}

const config={
  optimization: {
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader" 
          }
         ]
       },
    ]
  },
  devtool: 'eval-source-map',
  mode:'development',
  devServer: {
    host: getIPAdress(),//localhost
    contentBase: path.join(__dirname,'./build'),
    inline:true,
    hot:true,
    open : true,
    port: 5200,
    historyApiFallback:true,
    
    proxy:[{
       context: ['/graphql'],
       target: 'http://localhost:8181',
       changeOrigin: true,
       secure: false
    },
    {
       context: ['**/*.jpg','**/*.png','**/*.gif','**/*.mp4'],
       target: 'http://localhost:8181',
       changeOrigin: true,
       secure: false
    }],
    watchOptions: {//监听配置变化
      aggregateTimeout: 300,
      poll: 1000
    },
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),//热加载
  ],
}


module.exports=merge(configBase,config)