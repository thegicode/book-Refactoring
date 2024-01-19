import { expect } from "chai";

import {
    rednerPerson,
    listRecentPhotos,
} from "../../src/chp08/MoveStatmentsToCallers";

let result = [];
const outStream = {
    _store: [],

    get result() {
        return this._store.join("");
    },

    write: function (htmlString) {
        result.push(htmlString);
        this._store.push(htmlString);
    },

    reset() {
        this._store = [];
    },
};

describe("Move Statements to Callers", () => {
    beforeEach(() => {
        result = [];
        outStream.reset();
    });

    it("rednerPerson", () => {
        const aPerson = {
            name: "Alex",
            photo: {
                title: "holiday",
                location: "Greece",
                date: new Date("May 10, 2019"),
            },
        };
        rednerPerson(outStream, aPerson);
        expect(outStream.result).to.equal(
            `<p>Alex</p>\n<p>제목: holiday</p>\n<p>날짜: Fri May 10 2019</p>\n<p>위치: Greece</p>\n`
        );
    });

    it("render listRecentPhotos", () => {
        const photos = [
            {
                title: "holiday",
                location: "Greece",
                date: new Date("May 10, 2019"),
            },
            {
                title: "holiday",
                location: "Greece",
                date: new Date("June 10, 2030"),
            },
        ];
        listRecentPhotos(outStream, photos);
        expect(outStream.result).to.equal(
            `<div>\n<p>제목: holiday</p>\n<p>날짜: Mon Jun 10 2030</p>\n<p>위치: Greece</p>\n</div>\n`
        );
    });
});
