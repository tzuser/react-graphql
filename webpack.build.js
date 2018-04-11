const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css文件分离
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const {ReactLoadablePlugin}=require('react-loadable/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js
module.exports={
  entry: {
    main:path.join(__dirname,'./src/index.js'),
    vendors:[
    'react',
    'react-dom',
    'styled-components',
    'babel-polyfill'
    ],
    gestalts:[
      'gestalt'
    ],
    apollos:[
      "apollo-cache-inmemory",
      "apollo-client",
      "apollo-link-http",
      "react-apollo"
    ]
  },
  output:{
    path: path.resolve(__dirname,'build'),
    publicPath: '/',
    filename:'[name].js',
    chunkFilename:'[name].[id].js'
  },
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
            presets:['env','react','es2015','stage-0'],
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
          },{
            loader:'postcss-loader',
            options: {
              plugins:()=>[require("autoprefixer")({browsers:'last 5 versions'})],
            }
          },{
            loader:'sass-loader',
          }]
        }),
      }
    ]
  },
  resolve:{extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']},
  plugins:[
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
      names: ['vendors','gestalts','apollos','manifest'],
      minChunks:2
    }),   
    new CleanWebpackPlugin(['./build']),//删除打包文件
    new CopyWebpackPlugin([//复制静态文件
          {from:path.join(__dirname,'./static'),to:'static'}
        ]),
    new ReactLoadablePlugin({
            filename: './build/react-loadable.json',
      }),
   /* new UglifyJsPlugin({
        uglifyOptions: {
             ie8: false,
             ecma: 8,
             compress: {
               warnings: false
             },
             output: {
               comments: false,  // remove all comments
             },
         }
      }),*/
  ],
}
