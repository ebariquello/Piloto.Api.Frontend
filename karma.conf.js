module.exports = function (config) {
  config.set({
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-json-reporter'),
      require('karma-junit-reporter')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      failSpecWithNoExpectations: true,
    },
    jsonReporter: {
      stdout: false,
      outputFile: 'coverage/results.json'
    },
    junitReporter: {
      outputDir: 'reports/unittest/'
    },

    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'json', 'junit']
      : ['progress', 'kjhtml', 'junit', 'json'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      RedeChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--no-sandbox', '--disable-extensions', '--remote-debugging-port=9223']
      }
    },
    singleRun: false,
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary', 'json-summary'],
      fixWebpackSourcePaths: true,
      watermarks: {
        statements: [76, 80],
        functions: [53, 80],
        branches: [70, 80],
        lines: [76, 80]
      },
      thresholds: {
        global: {
          statements: 78.02,
          lines: 77.81,
          branches: 55.30,
          functions: 72.14
        },
        each: {
          statements: 40,
          overrides: {
            'src/*.model.ts': {
              statements: 0
            }/*,
            'src/*.enum.ts': {
              statements: 0
            },*/
          }
        }
      }
    }
  });
};
