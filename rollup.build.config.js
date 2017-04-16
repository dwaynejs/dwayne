const path = require('path');
const npm = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');
const inject = require('rollup-plugin-inject');

module.exports = {
  entry: './src/index.js',
  dest: './build/dwayne.js',
  format: 'iife',
  moduleName: 'Dwayne',
  sourceMap: true,
  plugins: [
    npm(),
    eslint({
      throwError: true
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
