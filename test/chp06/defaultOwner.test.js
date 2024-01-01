import { assert } from "chai";
import { defaultOwner, setDefaultOwner } from "../../src/chp06/defaultOwner.js";

describe("defaultOwner", () => {
    it("should return the default owner data", () => {
        const owner = defaultOwner();
        assert.equal("마틴", owner.firstName);
        assert.equal("파울러", owner.lastName);
    });
});

describe("setDefaultOwner", () => {
    it("should set the default owner data", () => {
        const newDeafultOwner = {
            firstName: "new",
            lastName: "onwer",
        };

        setDefaultOwner(newDeafultOwner);

        const owner = new defaultOwner();

        assert.equal("new", owner.firstName);
        assert.equal("onwer", owner.lastName);
    });
});
