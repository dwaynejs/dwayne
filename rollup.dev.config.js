const multi = require('rollup-plugin-multi-entry');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');
const pug = require('rollup-plugin-pug');

module.exports = {
  entry: [
    './browser.js',
    './dev.js',
    './livereload.js'
  ],
  dest: './bundle.js',
  format: 'iife',
  moduleName: 'D',
  sourceMap: true,
  plugins: [
    multi(),
    npm({
      browser: true,
      preferBuiltins: false
    }),
    pug({
      include: './**/*.pug',
      inlineFunctions: true
    }),
    cjs({
      include: 'node_modules/**',
      exclude: 'node_modules/rollup-plugin-node-builtins/**'
    }),
    eslint({
      include: './**/*.js'
    }),
    babel({
      presets: ['es2015-rollup', 'stage-0'],
      include: './**/*.js',
      plugins: ['transform-class-properties'],
      babelrc: false
    })
  ]
};
