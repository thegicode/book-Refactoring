import { expect } from "chai";
import { Customer } from "../../src/chp08/MoveField";
import Money from "js-money";

describe("Move Field", () => {
    it("calculates discounts", () => {
        const customer = new Customer("Mike", 0.05);
        expect(customer.applyDiscount(new Money(500, Money.EUR))).to.eql(
            new Money(475, Money.EUR)
        );
    });
});
