const Mocha = require("mocha");

const {
  EVENT_TEST_PASS,
  EVENT_TEST_PENDING,
  EVENT_TEST_FAIL,
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
} = Mocha.Runner.constants;
const { Base } = Mocha.reporters;
const OnStartEventPayload = require("./models/OnStartEventPayload");
const OnEndEventPayload = require("./models/OnEndEventPayload");
const OnTestEventPayload = require("./models/OnTestEventPayload");

class EventBasedReporter {
  constructor(runner, options = {}) {
    Base.call(this, runner, options);
    this.stats = runner.stats;
    this.total = runner.total;

    this.onStart = typeof options.reporterOption.onStart === "function" ? options.reporterOption.onStart : () => {};
    this.onTestPassCallback = typeof options.reporterOption.onTestPass === "function" ? options.reporterOption.onTestPass : () => {};
    this.onTestPendingCallback = typeof options.reporterOption.onTestPending === "function" ? options.reporterOption.onTestPending : () => {};
    this.onTestFailCallback = typeof options.reporterOption.onTestFail === "function" ? options.reporterOption.onTestFail : () => {};
    this.onEnd = typeof options.reporterOption.onEnd === "function" ? options.reporterOption.onEnd : () => {};

    runner.once(EVENT_RUN_BEGIN, () => {
      this.onStart(new OnStartEventPayload({
        totalTests: this.total,
      }));
    });

    runner.on(EVENT_TEST_PASS, (test) => {
      this.onTestPassCallback(new OnTestEventPayload(test));
    });

    runner.on(EVENT_TEST_PENDING, (test) => {
      this.onTestPendingCallback(new OnTestEventPayload(test));
    });

    runner.on(EVENT_TEST_FAIL, (test, error) => {
      this.onTestFailCallback(new OnTestEventPayload(test, error));
    });

    runner.once(EVENT_RUN_END, () => {
      this.onEnd(new OnEndEventPayload());
    });
  }
}

module.exports = EventBasedReporter;
