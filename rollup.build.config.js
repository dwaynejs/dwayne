const npm = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');

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
      presets: ['es2015-rollup'],
      babelrc: false
    })
  ]
};
