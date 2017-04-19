const gulp = require('gulp');
const _ = require('lodash');
const rollupStream = require('rollup-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('rollup-plugin-uglify');

const rollupBuildConfig = require('./rollup.build.config');

gulp.task('build', ['build:default', 'build:min', 'build:browser', 'build:es6']);

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
