class SingleTestDetails {
  constructor({
    title,
    fullTitle,
    file,
    speed,
    err,
  }) {
    this.title = title;
    this.fullTitle = fullTitle;
    this.file = file;
    this.speed = speed;
    this.error = err;
  }
}

module.exports = SingleTestDetails;
