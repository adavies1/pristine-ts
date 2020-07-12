const path = require('path');
const webpack = require('webpack');

module.exports = [
    {
        entry: {
            pristine: './src/Pristine.ts'
        },
        mode: 'development',
        target: 'web',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: {
                        loader: 'ts-loader',
                    },
                    exclude: /node_modules/,
                }
            ]
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            library: 'Pristine',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx']
        },
        devServer: {
            publicPath: '/dist/',
            hot: false,
            inline: false,
            injectClient: false,
            injectHot: false,
            liveReload: false
        },
        devtool: 'inline-source-map'
    }
];
