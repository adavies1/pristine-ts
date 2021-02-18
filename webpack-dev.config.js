const path = require('path');
const webpack = require('webpack');

const defaultConfig = require('./webpack.config.js');

module.exports = {
    ...defaultConfig,
    mode: 'development',
    devServer: {
        publicPath: '/dist/',
        hot: false,
        inline: false,
        injectClient: false,
        injectHot: false,
        liveReload: false
    },
    devtool: 'inline-source-map'
};