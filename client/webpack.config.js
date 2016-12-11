var webpack = require('webpack'); //eslint-disable-line
var definePlugin = new webpack.DefinePlugin({ //eslint-disable-line
  __DEV__: (process.env.NODE_ENV === 'dev')
});
module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass!'
      }
    ]
  },
  plugins: [definePlugin],
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:1337',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
