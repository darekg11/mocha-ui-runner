const Mocha = require("mocha");
const util = require("util");
const path = require("path");
const fs = require("fs").promises;
const glob = util.promisify(require("glob"));
const LoggerFactory = require("../logger");
const SuitesDetails = require("../models/suites/details");

module.exports = (app, configuration) => {
  const logger = LoggerFactory.getLogger();
  app.get("/suites", async (req, res) => {
    try {
      logger.debug("[server][suites][get] Received request.");
      const jsonRaportTempFileName = `list-suites-${new Date().toISOString()}.json`;

      logger.debug(`[server][suites][get] Attempting to find all tests in: ${configuration.MOCHA_TESTS_PATH}`);
      const specFilesToAdd = await glob(configuration.MOCHA_TESTS_PATH);
      logger.debug(`[server][suites][get] Found ${specFilesToAdd.length} test files in: ${configuration.MOCHA_TESTS_PATH}`);

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

      logger.debug("[server][suites][get] Attempting to run Mocha Runner in Dry mode to determine all available tests");
      await new Promise((resolve) => mochaRunner.run(resolve));
      logger.debug("[server][suites][get] Finished running Mocha Runner in Dry mode to determine all available tests");

      const jsonReportFile = await fs.readFile(jsonRaportTempFileName);
      const jsonReport = JSON.parse(jsonReportFile);
      await fs.unlink(jsonRaportTempFileName);
      mochaRunner.dispose();
      return res.status(200).json(new SuitesDetails(jsonReport));
    } catch (error) {
      logger.error("[server][suites][get] Error occurred.", error);
      return res.status(500).json({});
    }
  });
};
