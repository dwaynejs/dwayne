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
			/*{
				test: /\.js$/,
				loader: 'uglify-loader',
				exclude: /node_modules|bower_components/
			},*/
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
	devServer: { port },
	devtool: 'source-map'
};
