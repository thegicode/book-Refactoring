import { expect } from "chai";
import { Order } from "../../src/chp11/ReplaceParameterWithQuery";

describe(" 11.5 Replace Parameter with Query", () => {
    it("should calculate final price for quantity <= 100", () => {
        const order = new Order(100, 10);
        expect(order.finalPrice).to.equal(950);
    });

    it("shoud calculate final price for quantity > 100", () => {
        const order = new Order(101, 10);
        expect(order.finalPrice).to.equal(909);
    });
});
