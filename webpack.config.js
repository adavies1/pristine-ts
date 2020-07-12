const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        pristine: './src/Pristine.ts'
    },
    mode: 'production',
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
};
