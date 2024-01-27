import { expect } from "chai";
import { assert } from "chai";

import {
    Person,
    Person_2,
    TelephoneNumber_2,
} from "../../src/chp09/ChangeReferenceToValue";

describe("9.4 Change Reference to Value", () => {
    it("Person", () => {
        const aPerson = new Person();
        aPerson.officeAreaCode = "abc";
        aPerson.officeNumber = "123";

        expect(aPerson.officeAreaCode).to.equal("abc");
        expect(aPerson.officeNumber).to.equal("123");
    });

    it("Person_2", () => {
        assert(
            new TelephoneNumber_2("312", "555-0142").equals(
                new TelephoneNumber_2("312", "555-0142")
            )
        );

        // const aPerson = new Person_2();
        // aPerson.officeAreaCode = "abc";
        // aPerson.officeNumber = "123";

        // expect(aPerson.officeAreaCode).to.equal("abc");
        // expect(aPerson.officeNumber).to.equal("123");
    });
});
