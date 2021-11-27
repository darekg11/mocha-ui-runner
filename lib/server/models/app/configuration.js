class AppConfiguration {
  constructor({
    progressCheckIntervalMs,
    testsPath,
  } = {}) {
    this.progressCheckIntervalMs = progressCheckIntervalMs;
    this.testsPath = testsPath;
  }
}

module.exports = AppConfiguration;
