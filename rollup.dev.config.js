const npm = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: './browser.js',
  dest: './bundle.js',
  format: 'iife',
  moduleName: 'D',
  sourceMap: true,
  plugins: [
    npm(),
    babel({
      presets: ['es2015-rollup'],
      babelrc: false
    })
  ]
};
