import { expect } from "chai";
import {
    createEmployee,
    createEngineer,
} from "../../src/chp11/Replace ConstructorWithFactoryFunction";

describe("11.8  Replace Constructor with Factory Function: Employee", () => {
    it("create a Manager with the employee name", () => {
        const candidate = createEmployee("Sarah", "M");

        expect(candidate.name).to.equal("Sarah");
        expect(candidate.type).to.equal("Manager");
    });

    it("crate an Engineer wotj the employee name", () => {
        const candidate = createEngineer("Chloe");

        expect(candidate.name).to.equal("Chloe");
        expect(candidate.type).to.equal("Engineer");
    });
});
