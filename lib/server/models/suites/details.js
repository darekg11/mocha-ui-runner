const SingleTestDetails = require("../tests/details");
const TestsStats = require("../tests/stats");

class SuitesDetails {
  constructor({
    stats = {},
    tests = [],
  }) {
    this.stats = new TestsStats(stats);
    this.tests = tests.map((test) => new SingleTestDetails(test));
  }
}

module.exports = SuitesDetails;
