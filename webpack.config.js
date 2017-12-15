const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
	filename: '[name].css',
	disable: process.env.NODE_ENV === 'development',
});

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: ['webpack-dev-server/client?http://localhost:8080', './main.jsx'],
	output: {
		path: path.resolve(__dirname, './public/'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		contentBase: './public',
		hot: true,
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react'],
				},
			}],
			exclude: /node_modules/,
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.scss$/,
			use: extractPlugin.extract({
				use: ['css-loader', 'sass-loader'],
			}),
		},
		{
			test: /\.(png|jpg|jpeg|ico)$/,
			use: [{
				loader: 'file-loader',
				options: {
					outputPath: 'img/',
					name: '[name].[ext]',
				},
			}],
		},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		extractPlugin,
	],
};
