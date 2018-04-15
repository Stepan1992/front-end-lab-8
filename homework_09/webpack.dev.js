const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "bin"),
        open: true,
        port: 8080
    }
});