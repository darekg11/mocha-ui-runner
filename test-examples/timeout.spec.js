const assert = require("assert");

describe("timeout", () => {
  it("should error due to timeout", async () => {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    assert.equal(2 + 2, 4);
  });
});
