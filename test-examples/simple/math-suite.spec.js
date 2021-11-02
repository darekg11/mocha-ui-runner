const assert = require("assert");

describe("simple math suite", () => {
  it("should add two values", () => {
    assert.equal(2 + 2, 4);
  });

  it("should fail subtraction", () => {
    assert.equal(5 - 2, 1);
  });
});
