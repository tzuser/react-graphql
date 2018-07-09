require('babel-polyfill')
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'babel-preset-react', 'stage-0'],
  plugins: ['add-module-exports',
  'syntax-dynamic-import',
  "dynamic-import-node",
  "react-loadable/babel",
  'transform-decorators-legacy',
  'transform-decorators']
});

var alias=require('../alias');
require('node-require-alias').setAlias(alias);

//解决样式报错问题
require('css-modules-require-hook')({
    extensions: ['.css'],
    generateScopedName: '[name]__[local]-[hash:base64:8]',
});

require('./server');
