const gulp = require('gulp');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const server = require('./server');
const config = require('./webpack.config');

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

gulp.task('dev-server', (callback) => {
  new WebpackDevServer(webpack(config), {
    stats: {
      colors: true
    }
  }).listen(7777, 'localhost', () => {
    callback();
  });
});

gulp.task('build', (callback) => {
  const conf = _.cloneDeep(config);
  
  delete conf.devtool;

  conf.output.filename = 'domc.js';
  
  webpack(conf, () => {
    conf.output.filename = 'domc.min.js';
    conf.module.loaders.unshift({
      test: /\.js$/,
      loader: 'uglify-loader'
    });

    webpack(conf, () => {
      callback();
    });
  });
});

gulp.task('test-server', (callback) => {
  server().then(callback, callback);
});

modules.forEach((module) => {
  const taskName = `test${ module ? `:${ module }` : '' }`;
  const deps = module === 'Fetch' || !module ? ['test-server'] : [];
  
  gulp.task(taskName, deps, (callback) => {
    const fileName = module || 'all';
    const conf = _.cloneDeep(config);

    conf.entry = `mocha!./test/${ fileName }.js`;

    new WebpackDevServer(webpack(conf), {
      stats: {
        colors: true
      }
    }).listen(2222, 'localhost', () => {
      callback();
    });
  });
});
