import { expect } from "chai";
import { rating } from "../../src/chp10/ReplaceConditionalWithPolymorphism2";

describe("10.4.2 Replace Conditional with Polymorphism", () => {
    it("rating: give a B", () => {
        const voyage = { zone: "west-indies", length: 10 };
        const history = [
            { zone: "east-indies", profit: 5 },
            {
                zone: "west-indies",
                profit: 15,
            },
            {
                zone: "china",
                profit: -2,
            },
            {
                zone: "west-indies",
                profit: 7,
            },
        ];

        expect(rating(voyage, history)).to.equal("B");
    });
});
