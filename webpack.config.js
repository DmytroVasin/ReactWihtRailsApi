// npm run build

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./app_react/app.jsx'],
  output: {
    path: './public',
    filename: 'bundled.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true })
  ]
};
