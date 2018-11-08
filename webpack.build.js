const configBase = require('./webpack.base.js');
const merge = require('webpack-merge');

const path = require('path');
const webpack = require('webpack');

//const autoprefixer = require('autoprefixer');
//按需加载
const { ReactLoadablePlugin } = require('react-loadable/webpack');
//复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
//删除打包文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//压缩js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//文件大小查看 性能优化
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//把manifest打包到html
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const config = {
  optimization: {
    nodeEnv: 'production',
    namedChunks: true,
    runtimeChunk: 'single',
    splitChunks: {
      minChunks: Infinity,
    },
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
    ],
  },
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name][id].css',
    }),
    new CleanWebpackPlugin(['./build']), //删除打包文件
    new CopyWebpackPlugin([
      //复制静态文件
      { from: path.join(__dirname, './static'), to: 'static' },
    ]),
    new InlineManifestWebpackPlugin(),

    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = merge(configBase, config);
