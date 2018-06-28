const configBase = require('./webpack.base.js');
const merge=require('webpack-merge');

const path=require('path');
const webpack=require('webpack');

//const autoprefixer = require('autoprefixer');
//按需加载
const {ReactLoadablePlugin}=require('react-loadable/webpack');
//复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
//删除打包文件
const CleanWebpackPlugin = require("clean-webpack-plugin");
//压缩js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//文件大小查看 性能优化
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//拆分css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//去除多余css
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
//把manifest打包到html
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const config={
  optimization: {
    minimizer: [
      //去除多余css
      // new PurifyCSSPlugin({
      //   paths: glob.sync(path.join(__dirname, '/src/*/*.jsx')),
      //   moduleExtensions:['.jsx'],
      //   purifyOptions:{
      //     info:true,
      //     minify:true,
      //   }
      // }),
      new UglifyJSPlugin({
         sourceMap: true,
         uglifyOptions: {
           compress: {
             inline: false
           }
         }
      }),
      new OptimizeCSSAssetsPlugin({})
     ],
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            default: false,
            /*style: {
              test: /\.css/,
              name: "style",
              chunks: "all",
              priority: 1//优先级
            },*/
            /*ant: {
              test: /([\\/](_ant|_rmc))/,
              name: "ant",
              chunks: "all",
              minChunks:2,
              priority: 1//优先级
            },*/

            src: {
              chunks: "initial",
              minChunks:2,
              minSize:20*1024,
              priority: 100,//优先级
              enforce: true,
              reuseExistingChunk: false,
            },
            commons: {
              test: /(_react|_redux|_core|_graphql|_styled|_stylis|_history|_cross|_classnames|_apollo)/,//[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "initial",
              //minChunks:2,
              priority: -2//优先级
            }
        }
    }
  },
  context:path.resolve(__dirname,'src'),
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader" 
          }
         ]
       },
    ]
  },
  mode:'production',
  plugins:[
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name][id].css"
    }),
    new CleanWebpackPlugin(['./build']),//删除打包文件
    new CopyWebpackPlugin([//复制静态文件
          {from:path.join(__dirname,'./static'),to:'static'}
        ]),
    new InlineManifestWebpackPlugin(),
    
    new ReactLoadablePlugin({
            filename: './build/react-loadable.json',
      }),
    new BundleAnalyzerPlugin(),
  ],
}

module.exports=merge(configBase,config)