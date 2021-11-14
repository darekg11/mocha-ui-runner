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
}

module.exports = OnTestEventPayload;
