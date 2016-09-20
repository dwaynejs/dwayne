const gulp = require('gulp');
const _ = require('lodash');
const run = require('gulp-run');
const rollup = require('rollup');
const rollupStream = require('rollup-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const watch = require('rollup-watch');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const createServer = require('./server');

const rollupDevConfig = require('./rollup.dev.config');
const rollupBuildConfig = require('./rollup.build.config');
const rollupTestConfig = require('./rollup.test.config');
const config = require('./config.json');

const devServer = createServer();
const testServer = createServer(true);

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

gulp.task('default', ['server:dev'], () => {
  const watcher = watch(rollup, rollupDevConfig);

  watcher.on('event', (event) => {
    console.log(event);

    if (event.code === 'BUILD_START') {
      devServer.io.emit('toreload');
    }

    if (event.code === 'BUILD_END') {
      devServer.io.emit('reload');
    }
  });
});

gulp.task('build', ['build:default', 'build:min', 'build:es6', 'build:es5']);

gulp.task('jsdoc', ['server:dev', 'jsdoc:compile'], () => (
  gulp.watch(['./lib/**/*.js'], ['jsdoc:compile'])
));

gulp.task('jsdoc:public', ['server:dev', 'jsdoc:public:compile'], () => (
  gulp.watch(['./lib/**/*.js'], ['jsdoc:public:compile'])
));

gulp.task('test:node', () => (
  run('mocha test/node.js --reporter dot').exec()
));

modules.forEach((module) => {
  const taskName = `test${ module ? `:${ module }` : '' }`;
  
  gulp.task(taskName, ['server:test'], () => {
    const fileName = module || 'all';
    const config = _.cloneDeep(rollupTestConfig);

    config.entry.push(`./test/${ fileName }.js`);

    const watcher = watch(rollup, config);

    watcher.on('event', (event) => {
      console.log(event);

      if (event.code === 'BUILD_START') {
        testServer.io.emit('toreload');
      }

      if (event.code === 'BUILD_END') {
        testServer.io.emit('reload');
      }
    });
  });
});

gulp.task('server:dev', () => (
  devServer.listen(config.devServer.port)
));

gulp.task('server:test', () => (
  testServer.listen(config.testServer.port)
));

gulp.task('build:default', () => {
  const config = _.cloneDeep(rollupBuildConfig);

  return rollupStream(config)
    .pipe(source('dwayne.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:min', () => {
  const config = _.cloneDeep(rollupBuildConfig);

  config.plugins.push(uglify());

  return rollupStream(config)
    .pipe(source('dwayne.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:es6', () => {
  const config = _.cloneDeep(rollupBuildConfig);

  config.entry = './dwayne.js';
  config.format = 'es';
  config.sourceMap = false;

  return rollupStream(config)
    .pipe(source('es6.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:es5', () => {
  const config = _.cloneDeep(rollupBuildConfig);

  config.entry = './node.js';
  config.format = 'cjs';
  config.sourceMap = false;

  return rollupStream(config)
    .pipe(source('es5.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('jsdoc:compile', () => (
  run('./node_modules/jsdoc/jsdoc.js -c conf.json').exec()
));

gulp.task('jsdoc:public:compile', () => (
  run('./node_modules/jsdoc/jsdoc.js -c conf.public.json').exec()
));
