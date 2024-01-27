import { expect } from "chai";
import {
    ProductionPlan,
    ProductionPlan_1,
    ProductionPlan_2,
    ProductionPlan_3,
    ProductionPlan_4,
} from "../../src/chp09/ReplaceDerivedVariableWithQuery";

describe("Replace Derived Variable with Query", () => {
    it("ProductionPlan", () => {
        const productionPlan = new ProductionPlan();
        productionPlan.applyAdjustment({ amount: 1 });

        expect(productionPlan.production).to.equal(1);
    });

    it("ProductionPlan_1", () => {
        const productionPlan = new ProductionPlan_1();
        productionPlan.applyAdjustment({ amount: 1 });

        expect(productionPlan.production).to.equal(1);
    });

    it("ProductionPlan_2", () => {
        const productionPlan = new ProductionPlan_2();
        productionPlan.applyAdjustment({ amount: 1 });

        expect(productionPlan.production).to.equal(1);
    });

    it("ProductionPlan_3", () => {
        const productionPlan = new ProductionPlan_3();
        productionPlan.applyAdjustment({ amount: 1 });

        expect(productionPlan.production).to.equal(1);
    });

    it("ProductionPlan_4", () => {
        const productionPlan = new ProductionPlan_4();
        productionPlan.applyAdjustment({ amount: 1 });

        expect(productionPlan.production).to.equal(1);
    });
});
