const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
        //clean: true
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
};