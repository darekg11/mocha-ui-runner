const express = require("express");
const bodyParser = require("body-parser");
const LoggerFactory = require("./logger");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const init = (configuration) => {
  const logger = LoggerFactory.getLogger();
  app.listen(configuration.SERVER_PORT, () => {
    logger.info(`[server] Running at port: ${configuration.SERVER_PORT}.`);
  });
};

module.exports = {
  init,
};
