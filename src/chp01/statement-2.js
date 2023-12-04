const plays = require("./plays.json");
const invoices = require("./invoices.json");

console.log(statement(invoices, plays));

function statement(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    return renderPlainText(statementData, invoice, plays);

    function renderPlainText(data, invoice, plays) {
        let result = `청구 내역 (고객명: ${data.customer})\n`;

        for (let perf of invoice.performances) {
            result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
                perf.audience
            }석)\n`;
        }

        result += `총액: ${usd(totalAmount())}\n`;
        result += `적립 포인트: ${totalVolumeCredits()}점\n`;
        return result;

        function totalAmount() {
            let result = 0;
            for (let perf of invoice.performances) {
                result += amountFor(perf);
            }
            return result;
        }

        function totalVolumeCredits() {
            let result = 0;
            for (let perf of invoice.performances) {
                result += volumeCreditsFor(perf);
            }
            return result;
        }

        function usd(aNumber) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
            }).format(aNumber / 100);
        }

        function volumeCreditsFor(aPerformance) {
            let volumeCredits = 0;
            volumeCredits += Math.max(aPerformance.audience - 30, 0);
            if ("comedy" === playFor(aPerformance).type)
                volumeCredits += Math.floor(aPerformance.audience / 5);
            return volumeCredits;
        }

        function playFor(aPerformance) {
            return plays[aPerformance.playID];
        }

        function amountFor(aPerformance) {
            // 값이 바뀌지 않는 변수는 매개변수로 전달
            let result = 0; // 변수를 초기화하는 코드

            switch (playFor(aPerformance).type) {
                case "tragedy": // 비극
                    result = 40000;
                    if (aPerformance.audience > 30) {
                        result += 1000 * (aPerformance.audience - 30);
                    }
                    break;
                case "comedy": // 희극
                    result = 30000;
                    if (aPerformance.audience > 20) {
                        result += 1000 + 500 * (aPerformance.audience - 20);
                    }
                    result += 300 * aPerformance.audience;
                    break;
                default:
                    throw new Error(`알 수 없는 장르: ${playFor(perf).type}`);
            }

            return result; // 함수 안에서 값이 바뀌는 함수 반환
        }
    }
}
