const multi = require('rollup-plugin-multi-entry');
const builtins = require('rollup-plugin-node-builtins');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');
const pug = require('rollup-plugin-pug');

module.exports = {
  entry: './browser.js',
  dest: './test.js',
  format: 'iife',
  moduleName: 'D',
  sourceMap: true,
  plugins: [
    multi(),
    builtins(),
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
      exclude: 'node_modules/rollup-plugin-node-builtins/**',
      namedExports: {
        'node_modules/assert/assert.js': [
          'deepEqual',
          'deepStrictEqual',
          'notDeepEqual',
          'notEqual',
          'strictEqual'
        ]
      }
    }),
    eslint({
      include: './**/*.js'
    }),
    babel({
      presets: ['es2015-rollup', 'stage-0'],
      include: './**/*.js',
      exclude: 'node_modules/**',
      plugins: ['transform-class-properties'],
      babelrc: false
    })
  ]
};
