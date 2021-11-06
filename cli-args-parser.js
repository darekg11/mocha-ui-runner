const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { SERVER_DEFAULTS, MOCHA_DEFAULTS } = require("./lib/server/models/consts");
const { Configuration } = require("./lib/server/models/configuration");

// All of Server specific options start with server_ prefix
// All of Mocha specific options start with mocha_ prefix

class CommandLineParser {
  static parseCommandLineArgvs() {
    const parsed = yargs(hideBin(process.argv))
      .default("server_port", SERVER_DEFAULTS.PORT)
      .default("server_log_level", SERVER_DEFAULTS.LOG_LEVEL)
      .default("mocha_tests_path", MOCHA_DEFAULTS.TESTS_PATH)
      .argv;

    return new Configuration({
      SERVER_PORT: parsed.server_port,
      SERVER_LOG_LEVEL: parsed.server_log_level,
      MOCHA_TESTS_PATH: parsed.mocha_tests_path,
    });
  }
}

module.exports = CommandLineParser;
