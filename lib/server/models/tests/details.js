class SingleTestDetails {
  constructor({
    title,
    fullTitle,
    file,
    speed,
    duration,
    currentRetry,
    err,
  }) {
    this.title = title;
    this.fullTitle = fullTitle;
    this.file = file;
    this.speed = speed;
    this.duration = duration;
    this.currentRetry = currentRetry;
    this.error = err;
    this.errorMessage = err.message;
    this.errorStack = err.stack;
  }
}

module.exports = SingleTestDetails;
