import { expect } from "chai";
import { basicChargeAmount } from "../../src/chp06/CombineFuncionIntoClass-client3.js";

describe("CombineFuncionIntoClass-client3", () => {
    it("baseCharge", () => {
        expect(basicChargeAmount).to.equal(1);
    });
});
