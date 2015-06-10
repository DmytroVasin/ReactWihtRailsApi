module.exports = {
  entry: ['./app_react/app.jsx'],
  output: {
    path: './public',
    filename: 'bundled.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};
