/* eslint-disable no-console, global-require */

const fs = require('fs');
const del = require('del');
const ejs = require('ejs');
const webpack = require('webpack');

const config = {
    title: 'JustWedding',
    url: 'http://www.justwedding.pl',
    project: 'justwedding-76fa3',
    trackingID: 'UA-XXXXX-Y'
};

const tasks = new Map();

function run(task) {
    const start = new Date();
    console.log(`Starting '${task}'...`);
    return Promise.resolve().then(() => tasks.get(task)()).then(() => {
        console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
    }, err => console.error(err.stack));
}


tasks.set('clean', () => del(['/public/dist/*', '!public/dist/.git'], {dot: true}));

tasks.set('html', () => {
    const webpackConfig = require('./webpack.config');
    const assets = JSON.parse(fs.readFileSync('./public/dist/assets.json', 'utf8'));
    const template = fs.readFileSync('./public/index.ejs', 'utf8');
    const render = ejs.compile(template, {filename: './public/index.ejs'});
    const output = render({debug: webpackConfig.debug, bundle: assets.main.js, config});
    fs.writeFileSync('./public/index.html', output, 'utf8');
});

tasks.set('bundle', () => {
    const webpackConfig = require('./webpack.config');
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((err, stats) => {
            if (err) {
                reject(err);
            } else {
                console.log(stats.toString(webpackConfig.stats));
                resolve();
            }
        });
    });
});

tasks.set('build', () => {
    global.DEBUG = process.argv.includes('--debug') || false;
    return Promise.resolve()
        .then(() => run('clean'))
        .then(() => run('bundle'))
        .then(() => run('html'))
        .then(() => run('sitemap'));
});

tasks.set('publish', () => {
    const firebase = require('firebase-tools');
    return run('build')
        .then(() => firebase.login({nonInteractive: false}))
        .then(() => firebase.deploy({
            project: config.project,
            cwd: __dirname,
        }))
        .then(() => {
            setTimeout(() => process.exit());
        });
});

tasks.set('start', () => {
    let count = 0;
    global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
    return run('clean').then(() => new Promise(resolve => {
        const bs = require('browser-sync').create();
        const webpackConfig = require('./webpack.config');
        const compiler = webpack(webpackConfig);
        // Node.js middleware that compiles application in watch mode with HMR support
        // http://webpack.github.io/docs/webpack-dev-middleware.html
        const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: webpackConfig.stats,
        });
        compiler.plugin('done', stats => {
            // Generate index.html page
            const bundle = stats.compilation.chunks.find(x => x.name === 'main').files[0];
            const template = fs.readFileSync('./public/index.ejs', 'utf8');
            const render = ejs.compile(template, {filename: './public/index.ejs'});
            const output = render({debug: true, bundle: `/dist/${bundle}`, config});
            fs.writeFileSync('./public/index.html', output, 'utf8');

            // Launch Browsersync after the initial bundling is complete
            // For more information visit https://browsersync.io/docs/options
            if (++count === 1) {
                bs.init({
                    port: process.env.PORT || 3000,
                    ui: {port: Number(process.env.PORT || 3000) + 1},
                    server: {
                        baseDir: 'public',
                        middleware: [
                            webpackDevMiddleware,
                            require('webpack-hot-middleware')(compiler),
                            require('connect-history-api-fallback')(),
                        ],
                    },
                }, resolve);
            }
        });
    }));
});

run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start' /* default */);
