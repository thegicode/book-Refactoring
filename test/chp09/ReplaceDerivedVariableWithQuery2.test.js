import { expect } from "chai";
import {
    ProductionPlan,
    ProductionPlan_1,
    ProductionPlan_2,
    ProductionPlan_3,
} from "../../src/chp09/ReplaceDerivedVariableWithQuery2";

describe("Replace Derived Variable with Query 2", () => {
    it("ProductionPlan", () => {
        const productionPlan = new ProductionPlan(1);
        productionPlan.applyAdjustment({ amount: 2 });

        expect(productionPlan.production).to.equal(3);
    });

    it("ProductionPlan_1", () => {
        const productionPlan = new ProductionPlan_1(1);
        productionPlan.applyAdjustment({ amount: 2 });

        expect(productionPlan.production).to.equal(3);
    });

    it("ProductionPlan_2", () => {
        const productionPlan = new ProductionPlan_2(1);
        productionPlan.applyAdjustment({ amount: 2 });

        expect(productionPlan.production).to.equal(3);
    });

    it("ProductionPlan_3", () => {
        const productionPlan = new ProductionPlan_3(1);
        productionPlan.applyAdjustment({ amount: 2 });

        expect(productionPlan.production).to.equal(3);
    });
});
