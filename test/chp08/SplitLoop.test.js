import { expect } from "chai";
import { reportYoungestAgeAndTotalSalary } from "../../src/chp08/SplitLoop";

describe("SplitLoop", () => {
    it("reportYoungestAgeAndTotalSalary", () => {
        const people = [
            {
                age: "30",
                salary: 2000,
            },
            {
                age: "25",
                salary: 2000,
            },
            {
                age: "31",
                salary: 2000,
            },
        ];

        expect(reportYoungestAgeAndTotalSalary(people)).to.equal(
            `youngestAge 25, totalSalary 6000`
        );
    });
});
