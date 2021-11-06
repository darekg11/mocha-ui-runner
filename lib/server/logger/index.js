const winston = require("winston");

let LOGGER_INSTANCE = null;

const logFormat = winston.format.printf((info) => {
  const rest = {
    ...info,
    level: undefined,
    message: undefined,
    splat: undefined,
    timestamp: undefined,
  };
  const restString = JSON.stringify(rest, null, 4);
  return `[${info.timestamp}][${info.level.toUpperCase()}]${info.message}${restString !== "{}" ? ` ${restString}` : ""}`;
});

class LoggerFactory {
  static create(logLevel) {
    LOGGER_INSTANCE = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        logFormat,
      ),
      transports: [
        new winston.transports.Console({}),
      ],
    });
  }

  static getLogger() {
    return LOGGER_INSTANCE;
  }
}
module.exports = LoggerFactory;
