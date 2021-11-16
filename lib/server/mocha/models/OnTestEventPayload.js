const SingleTestDetails = require("../../models/tests/details");

class OnTestEventPayload {
  constructor(test = {}, error = {}) {
    this.title = test.title;
    this.fullTitle = test.fullTitle();
    this.file = test.file;
    this.duration = test.duration;
    this.currentRetry = test.currentRetry();
    this.speed = test.speed;
    this.errorMessage = error.message;
    this.errorStack = error.stack;
  }

  toSingleTestDetails() {
    return new SingleTestDetails({
      title: this.title,
      fullTitle: this.fullTitle,
      file: this.file,
      speed: this.speed,
      duration: this.duration,
      currentRetry: this.currentRetry,
      err: {
        message: this.errorMessage,
        stack: this.errorStack,
      },
    });
  }
}

module.exports = OnTestEventPayload;
