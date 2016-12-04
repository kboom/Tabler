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
        'react-mdl/extra/material.min.js',
        './main.jsx',
    ],

    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
        chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
        sourcePrefix: '  ',
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
                    path.resolve(__dirname, 'src')
                ],
                loader: `babel-loader?${JSON.stringify(babelConfig)}`,
            },
            {
                test: /\.css/,
                loaders: [
                    'style-loader',
                    `css-loader?${JSON.stringify({
                        sourceMap: isDebug,
                        modules: true,
                        localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
                        minimize: !isDebug,
                    })}`,
                    'postcss-loader'
                ],
                include: [
                    /flexboxgrid/,
                    path.resolve(__dirname, "src/main")
                ]
            },
            {
                test: /\.json$/,
                exclude: [
                    path.resolve(__dirname, 'src/main/routes.json'),
                ],
                loader: 'json-loader',
            },
            {
                test: /\.json$/,
                include: [
                    path.resolve(__dirname, 'src/main/routes.json'),
                ],
                loaders: [
                    `babel-loader?${JSON.stringify(babelConfig)}`,
                    path.resolve(__dirname, 'utils/routes-loader.js'),
                ],
            },
            {
                test: /\.md$/,
                loader: path.resolve(__dirname, 'utils/markdown-loader.js'),
            },
            {
                test: /\.(obj)$/,
                include: [
                    path.resolve(__dirname, 'src/main/assets/objects'),
                ],
                loader: 'url-loader?name=objects/[name]'
            },
            {
                test: /\.(jpg)$/,
                include: [
                    path.resolve(__dirname, 'src/main/assets/textures'),
                ],
                loader: 'url-loader?name=textures/[name]'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                include: [
                    path.resolve(__dirname, './src/main/assets/images')
                ],
                loader: 'url-loader?name=images/[name].[ext]',
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
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