const path = require('path');
const builtins = require('rollup-plugin-node-builtins');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const inject = require('rollup-plugin-inject');

module.exports = {
  format: 'iife',
  moduleName: 'Dwayne',
  plugins: [
    builtins(),
    npm({
      browser: true,
      preferBuiltins: false
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
          'strictEqual',
          'throws'
        ]
      }
    }),
    babel({
      include: './**/*.@(js|html)',
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers',
        [
          'istanbul',
          {
            exclude: ['test/**']
          }
        ]
      ]
    }),
    inject({
      exclude: './src/global.js',
      modules: {
        global: path.resolve('./src/global.js')
      }
    })
  ]
};
