import { expect } from "chai";
import rating from "../../src/chp06/rating.js";

describe("rating", () => {
    it("should give rating 1 when late deliveries less than or equal to 5 ", () => {
        const aDriverWithLateDeliveriesLessThan5 = {
            numberOfLateDeliveries: 4,
        };
        expect(rating(aDriverWithLateDeliveriesLessThan5)).to.equal(1);

        const aDriverWith5LateDeliveries = {
            numberOfLateDeliveries: 5,
        };
        expect(rating(aDriverWith5LateDeliveries)).to.equal(1);
    });

    // should give rating 2 when late deliveries more than 5
    it("should give rating 2 when late deliveries more than 5", () => {
        const aDriverWithLateDeliveriesMoreThan5 = {
            numberOfLateDeliveries: 6,
        };
        expect(rating(aDriverWithLateDeliveriesMoreThan5)).to.equal(2);
    });
});
