const path = require('path');
const multi = require('rollup-plugin-multi-entry');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');
const inject = require('rollup-plugin-inject');

module.exports = {
  entry: [
    './src/index.js',
    './entry.js'
  ],
  dest: './bundle.js',
  format: 'iife',
  moduleName: 'Dwayne',
  sourceMap: true,
  plugins: [
    multi(),
    npm({
      browser: true,
      preferBuiltins: false
    }),
    cjs({
      include: 'node_modules/**',
      exclude: 'node_modules/rollup-plugin-node-builtins/**'
    }),
    eslint({
      include: './**/*.js'
    }),
    babel({
      include: './**/*.js',
      exclude: 'node_modules/**'
    }),
    inject({
      exclude: './src/global.js',
      modules: {
        global: path.resolve('./src/global.js')
      }
    })
  ]
};
