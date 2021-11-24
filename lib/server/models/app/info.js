class AppInfo {
  constructor(
    suites = {},
    configuration = {},
  ) {
    this.stats = suites.stats;
    this.configuration = configuration;
    this.tests = suites.tests;
  }
}

module.exports = AppInfo;
