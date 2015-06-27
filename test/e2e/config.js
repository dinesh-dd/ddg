exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/login.js'],
  params: {
    login: {
      	user: 'dinesh@complitech.net',
      	password: '12345678aA'
    }
  },
  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
  },
  onPrepare: function() {
	  browser.baseUrl = "http://192.168.1.35:9000/"
  }
};