const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const LoggerFactory = require("./logger");
const suitesRoute = require("./routes/suite");
const runnerRoute = require("./routes/run");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const init = (configuration) => {
  const logger = LoggerFactory.getLogger();
  app.use(express.static(path.join(__dirname, "../app/dist")));
  suitesRoute(app, configuration);
  runnerRoute(app, configuration);
  app.listen(configuration.SERVER_PORT, () => {
    logger.info(`[server] Running at port: ${configuration.SERVER_PORT}.`);
  });
};

module.exports = {
  init,
};
