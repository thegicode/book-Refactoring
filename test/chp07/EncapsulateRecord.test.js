import { expect } from "chai";

import { getOrganization } from "../../src/chp07/EncapsulateRecord.js";

describe("EncapsulateRecord", () => {
    it("should give rignt name", () => {
        expect(getOrganization().name).to.equal("Acme Gooseberries");
    });

    it("should set name", () => {
        const organization = getOrganization();
        organization.name = "new name";
        expect(organization.name).to.equal("new name");
    });
});
