const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pathsToClean = [
    path.join(__dirname, '/dist')
];

module.exports = {
    entry: "./src/js/output-module.js",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            }),
            test: /\.css$/
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
};