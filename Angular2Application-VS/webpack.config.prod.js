var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var HtmlWebpackPlugin = require('webpack-html-plugin');
//var DefinePlugin = require('defined');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');

// Configuration in common to both client-side and server-side bundles
var sharedConfig = {
    resolve: { extensions: [ '.js', '.ts' ] },
    output: {
        filename: '[name].js',
        publicPath: '/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
        loaders: [
            { test: /\.ts$/, include: /src/, loaders: ['ts-loader']},
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.css$/, loader: 'to-string-loader!css-loader' },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader', query: { limit: 25000, name: 'css/[name].[ext]' } }
        ]
    }
};

// Configuration for client-side bundle suitable for running in browsers
var clientBundleConfig = merge(sharedConfig, {
    entry: { 'boot': './src/boot.ts' },
    output: { path: path.join(__dirname, './wwwroot'), filename:'scripts/app.js' },
    //devtool: isDevBuild ? 'inline-source-map' : null,
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './wwwroot/index-vendor.html',
            inject: 'body',
        }),
        /**
        * Plugin: DefinePlugin
        * Description: Define free variables.
        * Useful for having development builds with debug logging or adding global constants.
        *
        * Environment helpers
        *
        * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        */
       // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
       new webpack.DefinePlugin({
           'Environment': JSON.stringify('Production'),
           'API_URL': JSON.stringify('http://production-site.com')
       })
    ].concat(isDevBuild ? [] : [
        // Plugins that apply in production builds only
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ])
});



module.exports = [clientBundleConfig];
