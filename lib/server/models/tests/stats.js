class TestsStats {
  constructor({
    suites,
    tests,
    passes,
    pending,
    failures,
  }) {
    this.suites = suites;
    this.tests = tests;
    this.passes = passes;
    this.pending = pending;
    this.failures = failures;
  }
}

module.exports = TestsStats;
