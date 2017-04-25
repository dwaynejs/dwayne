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
      'coverage-istanbul'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-rollup-plugin',
      'karma-coverage-istanbul-reporter',
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
    coverageIstanbulReporter: {
      reports: ['html']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
