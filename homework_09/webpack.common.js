const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pathsToClean = [
    path.join(__dirname, '/bin')
];

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, '/bin'),
        filename: "app.bandle.js"
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            template: './src/app.html'
        }),
        new ExtractTextPlugin('style.css')
    ]
};