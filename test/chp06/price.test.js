import { expect } from "chai";
import { price } from "../../src/chp06/price.js";

describe("price", () => {
    it("should price order which quanity is under 50", () => {
        const anOrder = {
            quantity: 49,
            itemPrice: 1,
        };
        expect(price(anOrder)).to.equal(53.9);
    });

    it("should price order which quantity is above 50", () => {
        const anOrder = {
            quantity: 51,
            itemPrice: 1,
        };
        expect(price(anOrder)).to.equal(56.1);
    });
});
