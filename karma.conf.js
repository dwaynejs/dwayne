const rollupConfig = require('./rollup.test.config');

module.exports = (config) => {
  config.set({
    preprocessors: {
      'test/**/*.js': [
        'rollup'
      ]
    },
    reporters: [
      'progress',
      'coverage'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-rollup-plugin',
      'karma-coverage',
      'karma-mocha'
    ],
    frameworks: [
      'mocha'
    ],
    browsers: [
      'Chrome'
    ],
    files: [
      'test/all.js'
    ],

    rollupPreprocessor: rollupConfig,
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
