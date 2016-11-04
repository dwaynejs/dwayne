const path = require('path');
const npm = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');
const inject = require('rollup-plugin-inject');

module.exports = {
  entry: './browser.js',
  dest: './build/dwayne.js',
  format: 'iife',
  moduleName: 'D',
  sourceMap: true,
  plugins: [
    npm(),
    eslint({
      throwError: true
    }),
    babel({
      include: './**/*.js',
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    inject({
      exclude: './lib/constants/global.js',
      modules: {
        global: path.resolve('./lib/constants/global.js')
      }
    })
  ]
};
