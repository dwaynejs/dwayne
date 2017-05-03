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
      'karma-ie-launcher',
      'karma-firefox-launcher',
      'karma-opera-launcher',
      'karma-safari-launcher',
      'karma-chrome-launcher',
      'karma-rollup-plugin',
      'karma-coverage-istanbul-reporter',
      'karma-mocha'
    ],
    frameworks: [
      'mocha'
    ],
    browsers: [
      'Chrome',
      'Safari',
      // 'IE',
      'Firefox',
      'Opera'
    ],
    // browsers: ['Chrome'],
    files: [
      'test/all.js'
    ],

    concurrency: 1,
    rollupPreprocessor: rollupConfig,
    coverageIstanbulReporter: {
      reports: ['html'],
      thresholds: {
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        each: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        }
      }
    }
  });
};
