const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css文件分离
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

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

module.exports={
  entry: {
    main:path.join(__dirname,'./src/index.js'),
    vendors:['react',
    'react-redux',
    ],

  },
  output:{
    path: path.resolve(__dirname,'build'),
    publicPath: '/',
    filename:'[name].js',
    chunkFilename:'[name].[id].js'
  },
  devtool: 'eval-source-map',
  context:path.resolve(__dirname,'src'),
  module:{
    rules:[
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      {
        test:/\.(js|jsx)$/,
              include: path.resolve(__dirname, 'src'),
        use:[{
          loader:require.resolve('babel-loader'),
          options:{
            presets:['env','react',"es2015",'stage-0'],
            plugins:[
              //解决 import {} 文件变大的问题
              ["direct-import",["react-router-dom","react-router-redux","react-router"]]
            ]
          },
        }]
      },
      
      {
        test:/\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',//style-loader 将css插入到页面的style标签
          use:[{
            loader: 'css-loader',//css-loader 是处理css文件中的url(),require()等
            options: {
              sourceMap:true,
            }
          },{
            loader:'postcss-loader',
            options: {
              plugins:()=>[require("autoprefixer")({browsers:'last 5 versions'})],
              sourceMap:true,
            }
          }/*,{
            loader:'sass-loader',
            options:{
              sourceMap:true,
            }
          }*/]
        }),
      }
    ]
  },
  resolve:{extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']},
  devServer: {
    contentBase: path.resolve(__dirname,'build/'),
    inline:true,
    hotOnly:true,
    open : true,
    host: getIPAdress(),//localhost
    port: 5200,
    historyApiFallback:true,
    watchContentBase: true,
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
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    extractCSS,
    new webpack.DefinePlugin({
        'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.RUN_ENV':JSON.stringify(process.env.RUN_ENV || 'dev')
    }),
    new HTMLWebpackPlugin({
      title:'Webpack配置',
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname,'./index.ejs')
    }),
    new webpack.optimize.CommonsChunkPlugin({//公共组件分离
      names: ['vendors',/*'materials',*/'manifest'],
      minChunks:2
    }),
    new webpack.HotModuleReplacementPlugin()//热加载
  ],
}
