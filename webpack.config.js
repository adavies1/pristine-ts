const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        pristine: './src/Pristine.ts'
    },
    mode: 'production',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsconfig.bundle.json"
                    }
                },
                exclude: [/node_modules/, /.test.ts/]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/bundle'),
        library: 'Pristine',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
};
