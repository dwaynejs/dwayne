const gulp = require('gulp');
const _ = require('lodash');
const run = require('gulp-run');
const rollup = require('rollup');
const rollupStream = require('rollup-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const watch = require('rollup-watch');
const uglify = require('rollup-plugin-uglify');

const server = require('./server');

const rollupDevConfig = require('./rollup.dev.config');
const rollupBuildConfig = require('./rollup.build.config');
const rollupTestConfig = require('./rollup.test.config');
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

gulp.task('default', () => {
  const watcher = watch(rollup, rollupDevConfig);

  watcher.on('event', (event) => {
    console.log(event);
  });
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
  
  gulp.task(taskName, deps, () => {
    const fileName = module || 'all';
    const config = _.cloneDeep(rollupTestConfig);

    config.entry = [
      `./test/${ fileName }.js`,
      './browser.js'
    ];

    const watcher = watch(rollup, config);

    watcher.on('event', (event) => {
      console.log(event);
    });
  });
});

gulp.task('test-server', () =>
  server(serverConfig.testServer.port)
);

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

gulp.task('jsdoc:compile', () => (
  run('./node_modules/jsdoc/jsdoc.js -c conf.json').exec()
));

gulp.task('jsdoc:public:compile', () => (
  run('./node_modules/jsdoc/jsdoc.js -c conf.public.json').exec()
));
