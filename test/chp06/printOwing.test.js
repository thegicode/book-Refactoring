import { expect } from "chai";
import printOwing from "../../src/chp06/printOwing.js";

let Clock = {
    today: {
        getFullYear() {
            return 2000;
        },
        getMonth() {
            return 0;
        },
        getDate() {
            return 1;
        },
    },
};

class Console {
    constructor() {
        this._content = "";
    }

    log(content) {
        this._content += content + "\n";
    }

    get content() {
        return this._content;
    }
}

describe("printOwing", () => {
    it("should print owing", () => {
        let invoice = {
            orders: [{ amount: 1 }],
            customer: "JL",
        };

        let console = new Console();

        let expected =
            "******\n" +
            "** 고객 채무 **\n" +
            "******\n" +
            "고객명: JL\n" +
            "채무액: 1\n" +
            "마감일: 2000. 1. 31.\n";

        printOwing(invoice, console, Clock);

        expect(console.content).to.equal(expected);
    });
});
