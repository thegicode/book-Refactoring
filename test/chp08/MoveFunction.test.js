import { expect } from "chai";
import { trackSummary } from "../../src/chp08/MoveFunction";

describe("trackSummary", () => {
    it("calculate distance, pace and time between two points'", () => {
        const newYrok = {
            lat: 40.73061,
            lon: -73.935242,
        };
        const tokyo = {
            lat: 35.652832,
            lon: 139.839478,
        };

        expect(trackSummary([newYrok, tokyo])).to.eql({
            distance: 6740.914927144901,
            pace: 0.02472463581991205,
            time: 10000,
        });
    });
});
