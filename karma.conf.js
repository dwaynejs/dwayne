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
    files: [
      'test/all.js'
    ],

    concurrency: 1,
    rollupPreprocessor: rollupConfig,
    coverageIstanbulReporter: {
      reports: ['html']
    }
  });
};
