const Mocha = require("mocha");
const util = require("util");
const path = require("path");
const glob = util.promisify(require("glob"));
const LoggerFactory = require("../logger");
const SuitesDetails = require("../models/suites/details");
const { RUNNER_STATUS } = require("../models/consts");
const EventBasedReporter = require("../mocha/reporter");

const RUNNER = {
  status: RUNNER_STATUS.NOT_STARTED,
  stats: new SuitesDetails(),
};

module.exports = (app, configuration) => {
  const logger = LoggerFactory.getLogger();
  app.post("/runner/run", async (req, res) => {
    try {
      const body = req.body || {};
      logger.debug("[server][runner][run] Received request.", { body });
      if (RUNNER.status === RUNNER_STATUS.IN_PROGRESS) {
        return res.status(409).json({ error: "There is already test run in progress. Please wait till the end or stop it." });
      }

      const shouldRunSpecificSuite = !!body.suite;
      const specFilesToAdd = [];
      if (shouldRunSpecificSuite) {
        logger.debug(`[server][runner][run] Will run only suite at: ${body.suite}.`);
        specFilesToAdd.push(body.suite);
      } else {
        logger.debug(`[server][runner][run] Will run all suites at: ${configuration.MOCHA_TESTS_PATH}.`);
        const allSpecs = await glob(configuration.MOCHA_TESTS_PATH);
        specFilesToAdd.push(...allSpecs);
      }

      RUNNER.stats = new SuitesDetails();

      const mochaRunner = new Mocha({
        reporter: EventBasedReporter,
        reporterOptions: {
          onStart: (onStartEventPayload) => {
            logger.debug("[server][runner][run][reporter][event][onStart] Run started.", { onStartEventPayload });
            RUNNER.stats.stats.setTotalTests(onStartEventPayload.totalTests);
          },
          onTestPass: (onTestEventPayload) => {
            logger.debug("[server][runner][run][reporter][event][onTestPass] Test passed.", { onTestEventPayload });
            RUNNER.stats.stats.addPassingTest();
            RUNNER.stats.tests.push(onTestEventPayload.toSingleTestDetails());
          },
          onTestPending: (onTestEventPayload) => {
            logger.debug("[server][runner][run][reporter][event][onTestPending] Test is pending..", { onTestEventPayload });
            RUNNER.stats.stats.addPendingTest();
            RUNNER.stats.tests.push(onTestEventPayload.toSingleTestDetails());
          },
          onTestFail: (onTestEventPayload) => {
            logger.debug("[server][runner][run][reporter][event][onTestFail] Test failed.", { onTestEventPayload });
            RUNNER.stats.stats.addFailingTest();
            RUNNER.stats.tests.push(onTestEventPayload.toSingleTestDetails());
          },
          onEnd: (onEndEventPayload) => {
            logger.debug("[server][runner][run][reporter][event][onEnd] Run ended.", { onEndEventPayload });
          },
        },
        ui: configuration.MOCHA_UI,
      });

      specFilesToAdd.forEach((singleTest) => {
        const specFilePath = path.join(process.cwd(), singleTest);
        mochaRunner.addFile(specFilePath);
      });

      mochaRunner.run((failures) => {
        logger.debug(`[server][runner][run] Run finished. Failures count: ${failures}`);
        RUNNER.status = RUNNER_STATUS.FINISHED;
        mochaRunner.dispose();
      });

      RUNNER.status = RUNNER_STATUS.IN_PROGRESS;
      return res.status(202).json({ scheduled: true });
    } catch (error) {
      logger.error("[server][runner][run] Error occurred.", error);
      return res.status(500).json({});
    }
  });

  app.get("/runner/status", async (req, res) => {
    try {
      logger.debug("[server][runner][status] Received request.");
      return res.status(200).json(RUNNER);
    } catch (error) {
      logger.error("[server][runner][status] Error occurred.", error);
      return res.status(500).json({});
    }
  });
};
