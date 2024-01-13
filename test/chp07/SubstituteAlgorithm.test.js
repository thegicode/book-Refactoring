import { expect } from "chai";

import { foundPerson } from "../../src/chp07/SubstituteAlgorithm";

describe("SubstituteAlgorithm", () => {
    it("can find candidate", () => {
        expect(foundPerson(["Don"])).to.equal("Don");
        expect(foundPerson(["Don", "John"])).to.equal("Don");
        expect(foundPerson(["Kent", "Don", "John"])).to.equal("Kent");
        expect(foundPerson(["Lisa", "Don", "Tom"])).to.equal("Don");
    });
    it("report no candidate is found", () => {
        expect(foundPerson(["Tom", "Chloe"])).to.equal("");
    });
});
