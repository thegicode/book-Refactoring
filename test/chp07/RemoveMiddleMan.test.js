import { expect } from "chai";
import { Person, Department } from "../../src/chp07/RemoveMiddleMan";

describe("RemoveMiddleMan", () => {
    const aPerson = new Person("Tom", new Department("aManger", "999"));
    it("report tracking information", () => {
        expect(aPerson.name).to.eql("Tom");
        expect(aPerson.department.manager).to.eql("aManger");
        expect(aPerson.department.chargeCode).to.eql("999");
    });
});
