const path = require('path');
const builtins = require('rollup-plugin-node-builtins');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
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
    eslint({
      include: './**/*.js',
      exclude: 'node_modules/**'
    }),
    babel({
      include: './**/*.@(js|html)',
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers',
        [
          'istanbul',
          {
            exclude: [
              'test/**',

              'src/constants.js',
              'src/global.js',

              'src/utils/objectStatics.js',
              'src/utils/setSymbolSpecies.js',
              'src/utils/toStringTag.js',

              'src/helpers/Elem/matches.js',
              'src/helpers/Elem/getEvent.js'
            ]
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
