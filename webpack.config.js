module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/app'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		}]
	}
};