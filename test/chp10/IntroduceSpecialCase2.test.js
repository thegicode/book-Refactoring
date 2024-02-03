import { expect } from "chai";
import {
    customerName,
    Customer,
    Site,
    billingPlan,
    weeksDelinquent,
} from "../../src/chp10/IntroduceSpecialCase2";

describe("10.5.2 Introduce Special Case", () => {
    describe("customerName", () => {
        it('should give "occupant" if customer is "unknown" ', () => {
            expect(customerName(new Site("unknown"))).to.equal("occupant");
        });
        it('should give customer name if customer is not "unknown" ', () => {
            expect(customerName(new Site(new Customer("Ava")))).to.equal("Ava");
        });
    });

    describe("billingPlan", () => {
        it("should give basic billing plan", () => {
            expect(billingPlan(new Site("unknown"))).to.equal("basic");
        });
        it('should give customer billing plan when it is not "unknown" ', () => {
            expect(
                billingPlan(new Site(new Customer("Ava", "Annual")))
            ).to.equal("Annual");
        });
    });

    describe("weeksDelinquent", () => {
        it("should have no/zero weeks delinquent for unknown customer", () => {
            expect(weeksDelinquent(new Site("unknown"))).to.equal(0);
        });
        it("should report weeks delinquent from customer payment history", () => {
            expect(
                weeksDelinquent(
                    new Site(
                        new Customer("Ava", "Annual", {
                            weeksDelinquentInLastYear: 2,
                        })
                    )
                )
            ).to.equal(2);
        });
    });
});
