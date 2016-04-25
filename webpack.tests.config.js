const port = 2222;

module.exports = {
	entry: 'mocha!./test.js',
	output: {
		path: __dirname,
		filename: 'bundle.test.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules|bower_components/,
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules|bower_components/
			}
		]
	},
	cache: false,
	devtool: 'source-map',
	devServer: { port }
};