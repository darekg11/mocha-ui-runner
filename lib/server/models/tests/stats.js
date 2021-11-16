class TestsStats {
  constructor({
    suites,
    tests = 0,
    passes = 0,
    pending = 0,
    failures = 0,
  }) {
    this.suites = suites;
    this.tests = tests;
    this.passes = passes;
    this.pending = pending;
    this.failures = failures;
  }

  setTotalTests(totalTests) {
    this.tests = totalTests;
  }

  addPassingTest() {
    this.passes += 1;
  }

  addPendingTest() {
    this.pending += 1;
  }

  addFailingTest() {
    this.failures += 1;
  }
}

module.exports = TestsStats;
