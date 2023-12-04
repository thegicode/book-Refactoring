const plays = require("./plays.json");
const invoices = require("./invoices.json");

console.log(statement(invoices));

function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);

        // 청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
            perf.audience
        }석)\n`;
        totalAmount += amountFor(perf);
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
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

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
        volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
}