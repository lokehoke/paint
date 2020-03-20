'use strict';

const Webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const path = require('path');

let config = {
    watch: true,
    devtool: 'source-map',
    mode: 'development',
    entry: {
        main: [
            '@babel/polyfill',
            './src/scss/index.scss',
            './src/js/index.js'
        ]
    },
    output: {
		path: __dirname + '/public/resources/js/',
		filename: 'bundle.js'
	},
    module: {
        rules: [{
            test: /\.scss$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: [
						autoprefixer({
							browsers:['ie >= 8', 'last 4 version']
						})
					],
					sourceMap: true
				}
			}, {
				loader: 'sass-loader', options: {
					sourceMap: true
				}
			}]
        }, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					],
					plugins: ['@babel/plugin-proposal-class-properties']
				}
			}
		}]
	}, plugins: [
		new Webpack.NoEmitOnErrorsPlugin()
	]
};

module.exports = config;
