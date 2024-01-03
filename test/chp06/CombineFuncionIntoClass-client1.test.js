import { expect } from "chai";
import { baseCharge } from "../../src/chp06/CombineFuncionIntoClass-client1.js";

describe("CombineFuncionIntoClass-client1", () => {
    it("baseCharge", () => {
        expect(baseCharge).to.equal(1);
    });
});
