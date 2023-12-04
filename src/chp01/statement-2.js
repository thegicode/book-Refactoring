function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];

        let thisAmount = amountFor(perf, lay); // 추출한 함수를 이용

        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);

        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === play.type)
            volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역을 출력한다.
        result += ` ${paly.name}: ${format(thisAmount / 100)} (${
            perf.audience
        }석\n)`;
        totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

function amountFor(perf, play) {
    // 값이 바뀌지 않는 변수는 매개변수로 전달
    let thisAmount = 0; // 변수를 초기화하는 코드

    switch (play.type) {
        case "tragedy": // 비극
            thisAmount = 400000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy": // 희극
            thisAmount = 300000;
            if (perf.audience > 20) {
                thisAmount += 1000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${paly.type}`);
    }

    return thisAmount; // 함수 안에서 값이 바뀌는 함수 반환
}
