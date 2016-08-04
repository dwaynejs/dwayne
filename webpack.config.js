const port = 7777;

module.exports = {
  entry: {
    app: './browser.js'
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader'
      }
    ]
  },
  devServer: { port },
  devtool: '#cheap-module-eval-source-map'
};
