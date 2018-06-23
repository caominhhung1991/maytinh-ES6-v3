const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015','stage-3']
            }
        },
        {
            test:/\.css$/,
            loader:'style-loader!css-loader'
        },
        {
            test:/\.scss$/,
            loader:'style-loader!css-loader!sass-loader'
        },
        {
            test:/\.html$/,
            loader: 'html-loader'
        }
    ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: false
        }),
         new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    devServer: {
        contentBase: 'public',
        host: 'localhost',
        port: '3000'
    }
};