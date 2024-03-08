import { expect } from "chai";
import { charge } from "../../src/chp11/ReplaceCommandWithFunction";

describe("11.10 Command with Function : ChargeCalculator", () => {
    const customer = { baseRate: 0.1 };
    const provider = { connectionCharge: 1000 };

    it("should calculate total  charge", () => {
        expect(charge(customer, 100, provider)).to.equal(1010);
    });
});
