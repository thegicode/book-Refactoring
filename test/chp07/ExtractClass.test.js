import { expect } from "chai";
import { Person } from "../../src/chp07/ExtractClass.js";

describe("ExtractClass", () => {
    it("returns name, area code, number and telephone number correctly", () => {
        const aPerson = new Person("Grace", "020", "12345678");
        expect(aPerson.name).to.equal("Grace");
        expect(aPerson.officeAreaCode).to.equal("020");
        expect(aPerson.officeNumber).to.equal("12345678");
        expect(aPerson.telephoneNumber).to.equal("(020) 12345678");
    });
});
