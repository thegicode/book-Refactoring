import { expect } from "chai";
import { highPriorityCount } from "../../src/chp07/ReplacePrimitiveWithObject.js";

describe("highPriorityCount", () => {
    it("has 2 orders", () => {
        expect(highPriorityCount).to.equal(2);
    });
});
