import { expect } from "chai";
import { statement } from "../../src/chp01/statement.js";
import { htmlStatement } from "../../src/chp01/statement.js";

describe("statement", () => {
    let playsJson = {
        hamlet: { name: "Hamlet", type: "tragedy" },
        "as-like": { name: "As You Like It", type: "comedy" },
        othello: { name: "Othello", type: "tragedy" },
    };

    let invoicesJson = {
        customer: "BigCo",
        performances: [
            {
                playID: "hamlet",
                audience: 55,
            },
            {
                playID: "as-like",
                audience: 35,
            },
            {
                playID: "othello",
                audience: 40,
            },
        ],
    };
    it("should print a statement for multiple plays, single customer and multiple seats in plain text", () => {
        let expected =
            "청구 내역 (고객명: BigCo)\n" +
            " Hamlet: $650.00 (55석)\n" +
            " As You Like It: $490.00 (35석)\n" +
            " Othello: $500.00 (40석)\n" +
            "총액: $1,640.00\n" +
            "적립 포인트: 47점\n";

        expect(statement(invoicesJson, playsJson)).to.equal(expected);
    });

    it("should print a statement for multiple plays, single customer and multiple seats in html", () => {
        let result = `<h1>청구 내역 (고객명: BigCo)</h1>\n`;
        result += "<table>\n";
        result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n`;
        result += `<tr><td>Hamlet</td><td>(55석)</td><td>$650.00</td></tr>\n`;
        result += `<tr><td>As You Like It</td><td>(35석)</td><td>$490.00</td></tr>\n`;
        result += `<tr><td>Othello</td><td>(40석)</td><td>$500.00</td></tr>\n`;
        result += "</table>\n";
        result += `<p>총액: <em>$1,640.00</em></p>\n`;
        result += `<p>적립 포인트: <em>47</em>점</p>\n`;

        expect(htmlStatement(invoicesJson, playsJson)).to.equal(result);
    });
});
