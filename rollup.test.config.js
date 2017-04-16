const path = require('path');
const multi = require('rollup-plugin-multi-entry');
const builtins = require('rollup-plugin-node-builtins');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel');
const dwayneHTML = require('rollup-plugin-dwayne-html');
const inject = require('rollup-plugin-inject');

module.exports = {
  entry: [
    './src/index.js',
    './test/forAll.js',
    './livereload.js'
  ],
  dest: './test.js',
  format: 'iife',
  moduleName: 'Dwayne',
  sourceMap: true,
  plugins: [
    multi(),
    builtins(),
    npm({
      browser: true,
      preferBuiltins: false
    }),
    dwayneHTML({
      include: './**/*.html'
    }),
    cjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/rollup-plugin-node-builtins/**',
        'node_modules/buffer-es6/**',
        'node_modules/process-es6/**'
      ],
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
      include: './**/*.@(js|html)',
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
