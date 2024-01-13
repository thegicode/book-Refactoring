import { expect } from "chai";
import { Person, Department } from "../../src/chp07/HideDelegate";

describe("HideDelegate", () => {
    const aPerson = new Person("Tom", new Department("aManger", "999"));
    it("report tracking information", () => {
        expect(aPerson.name).to.eql("Tom");
        expect(aPerson.manager).to.eql("aManger");
        expect(aPerson.chargeCode).to.eql("999");
    });
});
