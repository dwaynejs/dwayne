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

const createServer = require('./server');

const rollupDevConfig = require('./rollup.dev.config');
const rollupBuildConfig = require('./rollup.build.config');
const rollupTestConfig = require('./rollup.test.config');

const devServer = createServer();
const testServer = createServer();

const modules = [
  '',
  'Block',
  'Elem'
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

gulp.task('build', ['build:default', 'build:min', 'build:browser', 'build:es6']);

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
  devServer.listen(7777)
));

gulp.task('server:test', () => (
  testServer.listen(8888)
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

gulp.task('build:browser', () => {
  const config = _.cloneDeep(rollupBuildConfig);

  config.format = 'cjs';
  config.sourceMap = false;

  return rollupStream(config)
    .pipe(source('index.js'))
    .pipe(gulp.dest('./lib'));
});

gulp.task('build:es6', () => {
  const config = _.cloneDeep(rollupBuildConfig);

  config.format = 'es';
  config.sourceMap = false;

  return rollupStream(config)
    .pipe(source('es6.js'))
    .pipe(gulp.dest('./lib'));
});
