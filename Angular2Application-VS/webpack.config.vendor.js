var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('webpack-html-plugin');

var extractCSS = new ExtractTextPlugin('css/vendor.css');

module.exports = {
    resolve: {
        extensions: [ '.js' ]
    },
    module: {
        loaders: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000&name=css/[name].[ext]' },
            { test: /\.css(\?|$)/, loader: extractCSS.extract(['css-loader']) }
        ]
    },
    entry: {
        vendor: [
            'core-js/es6',
            'core-js/es7/reflect',
            'zone.js',
            'zone.js/dist/zone',
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/forms',
            '@angular/platform-server',
            'rxjs',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.css',
            'font-awesome/css/font-awesome.min.css',
            'jquery',
        ]
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),//, 'dist'
        filename: './scripts/[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(__dirname, './src'),
            {}),
        extractCSS,
         new HtmlWebpackPlugin({
             filename: './index-vendor.html',
             template: './src/app/index.html',
             inject: 'body',
         }),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'wwwroot', '[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ].concat(isDevBuild ? [] : [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ])
};
