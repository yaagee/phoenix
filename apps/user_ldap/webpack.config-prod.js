module.exports = {
	entry: './src/default.js',
	output : {
		path: `${__dirname}/js`,
		filename : "user_ldap.bundle.js"
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.min.js'
		}
	},
	module: {
		rules: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			use: 'babel-loader',
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				use: [
					'vue-style-loader',
					'css-loader',
					'less-loader'
				]
			}
		}]
	}
}
