const { SERVER_DEFAULTS, MOCHA_DEFAULTS } = require("./consts");

class Configuration {
  constructor({
    SERVER_PORT,
    SERVER_LOG_LEVEL,
    MOCHA_TESTS_PATH,
  }) {
    this.SERVER_PORT = SERVER_PORT || SERVER_DEFAULTS.PORT;
    this.SERVER_LOG_LEVEL = SERVER_LOG_LEVEL || SERVER_DEFAULTS.LOG_LEVEL;
    this.MOCHA_TESTS_PATH = MOCHA_TESTS_PATH || MOCHA_DEFAULTS.TESTS_PATH;
  }
}

module.exports = {
  Configuration,
};
