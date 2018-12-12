const path = require('path');
const webpack = require('webpack');
const alias = require('./alias');
//const OfflinePlugin = require('offline-plugin');

//html生成
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.eot$/, /\.ttf$/, /\.woff$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
        ],
      },
    ],
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    alias: alias,
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV),
    }),
    ////new OfflinePlugin(),//离线缓存
    new HTMLWebpackPlugin({
      title: 'TangZuo',
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, './index.ejs'),
    }),
  ],
};
