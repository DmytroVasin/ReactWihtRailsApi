module.exports = {
  entry: ['./app_react/app.jsx'],
  output: {
    path: './app/assets/javascripts',
    filename: 'bundled.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};
