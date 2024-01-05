import { assert } from "chai";
import _ from "lodash";
import { enrichReading } from "../../src/chp06/CombineFunctionsIntoTransform";

describe("CombineFunctionsIntoTransform", () => {
    it("check reading unchanged", () => {
        const baseReading = {
            customer: "ivan",
            quantity: 10,
            month: 5,
            year: 2017,
        };

        const oracle = _.cloneDeep(baseReading);
        enrichReading(baseReading);
        assert.deepEqual(baseReading, oracle);
    });
});
