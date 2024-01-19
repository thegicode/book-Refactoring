import { expect } from "chai";

import {
    renderPerson,
    photoDiv,
} from "../../src/chp08/MoveStatementsIntoFunction";

const date = new Date("May 10, 2019");

const aPerson = {
    name: "Alex",
    photo: {
        title: "holiday",
        location: "Greece",
        date: date,
    },
};

describe("Move Statements into Function", () => {
    it("render renderPerson", () => {
        expect(renderPerson(aPerson)).to.equal(
            "<p>Alex</p>\n\n<p>제목: holiday</p>\n<p>위치: Greece</p>\n<p>날짜: Fri May 10 2019</p>"
        );
    });
    it("render photoDiv", () => {
        expect(photoDiv(aPerson.photo)).to.equal(
            "<div>\n<p>제목: holiday</p>\n<p>위치: Greece</p>\n<p>날짜: Fri May 10 2019</p>\n</div>"
        );
    });
});
