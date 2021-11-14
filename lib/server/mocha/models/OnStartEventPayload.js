class OnStartEventPayload {
  constructor({
    totalTests = 0,
  }) {
    this.totalTests = totalTests;
  }
}

module.exports = OnStartEventPayload;
