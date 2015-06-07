module.exports = {
  entry: ['./app_react/app.jsx'],
  output: {
    path: './public',
    filename: 'bundled.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};
