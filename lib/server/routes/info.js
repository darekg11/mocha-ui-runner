const Mocha = require("mocha");
const util = require("util");
const fs = require("fs").promises;
const path = require("path");
const glob = util.promisify(require("glob"));
const LoggerFactory = require("../logger");
const SuitesDetails = require("../models/suites/details");
const AppConfiguration = require("../models/app/configuration");
const AppInfo = require("../models/app/info");

module.exports = (app, configuration) => {
  const logger = LoggerFactory.getLogger();
  app.get("/info", async (req, res) => {
    try {
      logger.debug("[server][info][get] Received request.");
      const jsonRaportTempFileName = `list-suites-${new Date().toISOString()}.json`;

      logger.debug(`[server][info][get] Attempting to find all tests in: ${configuration.MOCHA_TESTS_PATH}`);
      const specFilesToAdd = await glob(configuration.MOCHA_TESTS_PATH);
      logger.debug(`[server][info][get] Found ${specFilesToAdd.length} test files in: ${configuration.MOCHA_TESTS_PATH}`);

      const mochaRunner = new Mocha({
        dryRun: true,
        reporter: "json",
        reporterOptions: {
          output: jsonRaportTempFileName,
        },
        ui: configuration.MOCHA_UI,
      });

      if (specFilesToAdd.length === 0) {
        return res.status(200).json(new SuitesDetails());
      }

      specFilesToAdd.forEach((singleTest) => {
        const specFilePath = path.join(process.cwd(), singleTest);
        mochaRunner.addFile(specFilePath);
      });

      logger.debug("[server][info][get] Attempting to run Mocha Runner in Dry mode to determine all available tests");
      await new Promise((resolve) => mochaRunner.run(resolve));
      logger.debug("[server][info][get] Finished running Mocha Runner in Dry mode to determine all available tests");

      const jsonReportFile = await fs.readFile(jsonRaportTempFileName);
      const jsonReport = JSON.parse(jsonReportFile);
      await fs.unlink(jsonRaportTempFileName);
      mochaRunner.dispose();
      const suites = new SuitesDetails(jsonReport);
      const appConfiguration = new AppConfiguration({
        progressCheckIntervalMs: configuration.SERVER_PROGRESS_INTERVAL_MS,
        testsPath: configuration.MOCHA_TESTS_PATH,
      });
      return res.status(200).json(new AppInfo(suites, appConfiguration));
    } catch (error) {
      logger.error("[server][info][get] Error occurred.", error);
      return res.status(500).json({});
    }
  });
};
