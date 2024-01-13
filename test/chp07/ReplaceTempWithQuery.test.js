import { expect } from "chai";
import { Order } from "../../src/chp07/ReplaceTempWithQuery.js";

describe("ReplaceTempWithQuery", () => {
    it("calculates price when total cost is lower than 1000", () => {
        const anOrder = new Order(2, { price: 500 });
        expect(anOrder.price).to.equal(980);
        // expect(anOrder.price).to.equal(2 * 500 * 0.98);
    });

    it("calculates price when total cost is more than 1000", () => {
        const anOrder = new Order(2, { price: 501 });
        expect(anOrder.price).to.equal(951.9);
        // expect(anOrder.price).to.equal(2 * 501 * (0.98 - 0.03));
    });
});
