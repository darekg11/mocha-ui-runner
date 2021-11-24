class AppConfiguration {
  constructor({
    progressCheckIntervalMs,
    testsPath,
  } = {}) {
    this.progressCheckIntervalMs = progressCheckIntervalMs;
    this.configuration = testsPath;
  }
}

module.exports = AppConfiguration;
