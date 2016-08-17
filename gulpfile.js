const gulp = require('gulp');
const _ = require('lodash');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const run = require('gulp-run');

const server = require('./server');

const webpackConfig = require('./webpack.config');
const serverConfig = require('./config.json');

const modules = [
  '',
  'D',
  'Alphabet',
  'Arr',
  'BlobObject',
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
  }).listen(serverConfig.webpackDevServer.port, 'localhost', callback);
});

gulp.task('build', ['build:default', 'build:min']);

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
    }).listen(serverConfig.webpackTestServer.port, 'localhost', callback);
  });
});

gulp.task('test-server', () =>
  server(serverConfig.testServer.port)
);

gulp.task('build:default', () => {
  const config = _.cloneDeep(webpackConfig);

  delete config.devtool;

  return gulp.src('./browser.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest('./'));
});

gulp.task('build:min', () => {
  const config = _.cloneDeep(webpackConfig);

  delete config.devtool;

  config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  return gulp.src('./browser.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest('./'));
});

gulp.task('jsdoc:compile', () => (
  run('./node_modules/jsdoc/jsdoc.js -c conf.json').exec()
));

gulp.task('jsdoc:public:compile', () => (
  run('./node_modules/jsdoc/jsdoc.js -c conf.public.json').exec()
));
