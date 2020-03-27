'use strict';

const Webpack = require('webpack');

const path = require('path');

module.exports = env => ({
	watch: false,
	devtool: 'source-map',
    mode: 'production',
	entry:
	{
		main:
		[
			path.join(__dirname, 'test.ts'),
		],
	},
	output:
	{
		path: path.join(__dirname, 'public'),
		filename: 'test.js',
	},
	resolve: {
		extensions:
		[
			'.ts',
			'.js',
		],
	},
	module:
	{
		rules:
		[
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
                use:
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript']
                    }
                },
			},
		],
	},
	plugins:
	[
		new Webpack.NoEmitOnErrorsPlugin(),
	],
});
