module.exports = {
  entry: {
    app: './browser.js'
  },
  output: {
    path: __dirname,
    filename: 'D.js'
  },
  module: {
    loaders: [
      {
       test: /\.js$/,
       loader: 'uglify-loader'
      },
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
  }
};
