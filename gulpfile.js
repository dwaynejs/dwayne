const gulp = require('gulp');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const jsdoc = require('gulp-jsdoc3');

const server = require('./server');

const webpackConfig = require('./webpack.config');
const jsdocPublicConfig = require('./conf.json');

const jsdocConfig = _.cloneDeep(jsdocPublicConfig);

jsdocConfig.opts.access = 'all';
jsdocConfig.opts.destination = 'docs/';

const modules = [
  '',
  'Alphabet',
  'Arr',
  'Dat',
  'Elem',
  'Fetch',
  'Func',
  'Num',
  'Promise',
  'Router',
  'Str',
  'Super',
  'Switcher'
];

gulp.task('default', (callback) => {
  new WebpackDevServer(webpack(webpackConfig), {
    stats: {
      colors: true
    }
  }).listen(7777, 'localhost', () => {
    callback();
  });
});

gulp.task('build', (callback) => {
  const config = _.cloneDeep(webpackConfig);
  
  delete config.devtool;

  config.output.filename = 'domc.js';
  
  webpack(config, () => {
    config.output.filename = 'domc.min.js';
    config.module.loaders.unshift({
      test: /\.js$/,
      loader: 'uglify-loader'
    });

    webpack(config, () => {
      callback();
    });
  });
});

gulp.task('jsdoc', ['test-server', 'jsdoc:compile'], () => (
  gulp.watch(['./lib/**/*.js'], ['jsdoc:compile'])
));

gulp.task('jsdoc:public', ['test-server', 'jsdoc:public:compile'], () => (
  gulp.watch(['./lib/**/*.js'], ['jsdoc:public:compile'])
));

modules.forEach((module) => {
  const taskName = `test${ module ? `:${ module }` : '' }`;
  const deps = module === 'Fetch' || !module ? ['test-server'] : [];
  
  gulp.task(taskName, deps, (callback) => {
    const fileName = module || 'all';
    const config = _.cloneDeep(webpackConfig);

    config.entry = [
      `mocha!./test/${ fileName }.js`,
      './browser.js'
    ];

    new WebpackDevServer(webpack(config), {
      stats: {
        colors: true
      }
    }).listen(2222, 'localhost', () => {
      callback();
    });
  });
});

gulp.task('test-server', (callback) => {
  server()
    .then(callback)
    .catch(() => {
      callback();
    });
});

gulp.task('jsdoc:compile', (callback) => (
  gulp.src('./lib')
    .pipe(jsdoc(jsdocConfig, callback))
));

gulp.task('jsdoc:public:compile', (callback) => (
  gulp.src('./lib')
    .pipe(jsdoc(jsdocPublicConfig, callback))
));
