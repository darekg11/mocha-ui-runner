const CliParser = require("./cli-args-parser");
const LoggerFactory = require("./lib/server/logger");
const { init } = require("./lib/server");

const configuration = CliParser.parseCommandLineArgvs();
LoggerFactory.create(configuration.SERVER_LOG_LEVEL);

const logger = LoggerFactory.getLogger();

logger.debug("[bootstrap] Starting Mocha UI Runner.", { configuration });

init(configuration);
