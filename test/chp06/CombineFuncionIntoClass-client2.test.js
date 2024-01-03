import { expect } from "chai";
import { taxableCharge } from "../../src/chp06/CombineFuncionIntoClass-client2.js";

describe("CombineFuncionIntoClass-client2", () => {
    it("taxableCharge", () => {
        expect(taxableCharge).to.equal(0.9);
    });
});
