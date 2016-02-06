var webpack = require('webpack');

var webpackConfig = {
  output: {
    path: '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: __dirname
    },
    { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'}
  ]},
  entry: "./app/index.js",
};

module.exports = webpackConfig;