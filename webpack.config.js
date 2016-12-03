const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('./package.json');

const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR = !!global.HMR;
const babelConfig = Object.assign({}, pkg.babel, {
    babelrc: false,
    cacheDirectory: useHMR,
});

const config = {

    context: path.join(__dirname, 'src/main'),

    entry: [
        '!!style!css!react-mdl/extra/material.min.css',
        '!!style!css!react-grid-layout/css/styles.css',
        '!!style!css!react-resizable/css/styles.css',
        'react-mdl/extra/material.min.js',
        './main.js',
    ],

    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: isDebug ? "[name].js?[hash]" : "[name].[hash].js",
        chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
        sourcePrefix: '  '
    },

    debug: isDebug,

    devtool: isDebug ? 'source-map' : false,

    stats: {
        colors: true,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose,
    },

    module: {
        preLoaders: [
            {
                loader: 'eslint-loader',
                test: /\.js[x]?$/,
                include: [
                    path.join(__dirname, 'src'),
                ]
            }
        ],
        loaders: [
            {
                test: /\.js[x]?$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loader: `babel-loader?${JSON.stringify(babelConfig)}`
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            __DEV__: isDebug,
        }),
        new AssetsPlugin({
            path: path.resolve(__dirname, './public/dist'),
            filename: 'assets.json',
            prettyPrint: true
        })
    ]

};

if (!isDebug) {
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: isVerbose}}));
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
    babelConfig.plugins.unshift('react-hot-loader/babel');
    config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;