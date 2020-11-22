const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	context: path.resolve(__dirname, "./src"),
	entry: ["./main.js"],
	output: {
		path: path.resolve(__dirname, "./public/"),
		filename: "bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["es2015", "react"]
						}
					}
				],
			},
			{
				test: /\.css$/i,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{loader: "css-loader"},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{loader: "css-loader"},
					{loader: "sass-loader"}
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'img/',
						name: '[name].[ext]',
					},
				}],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	],
	resolve: {
		extensions: [".js", ".jsx"]
	}
}
