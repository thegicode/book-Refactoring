import { expect } from "chai";
import sinon from "sinon";
import {
    alertForMiscreant,
    findMiscreant,
} from "../../src/chp11/SeperateQueryFromModifier";

describe("11.1 Seperate Query from Modifier", () => {
    it("find kim and set off alram", () => {
        const alarm = {
            setoff: function (msg) {},
        };

        const mock = sinon.mock(alarm);
        mock.expects("setoff").once().withArgs("Found Miscreant Kim");

        expect(findMiscreant(["Tom", "Helen", "Kim"], alarm)).to.equal("Kim");
    });

    it("find Choi and set off alarm", () => {
        const alarm = { setOff: function (msg) {} };

        const mock = sinon.mock(alarm);
        mock.expects("setOff").once().withArgs("Found Miscreant Choi");

        expect(findMiscreant(["Tom", "Helen", "Choi"], alarm)).to.equal("Choi");
        alertForMiscreant(["Tom", "Helen", "Choi"], alarm);
        mock.verify();
    });
});
