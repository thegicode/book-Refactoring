/**
 * 11.3 플래그 인수 제거하기 Remove Flag Argument 매개변수를 까다로운 방식으로 사용할 때
 * 배송일자를 계산하는 호출
 */

const { RSD } = require("js-money");

// 앞에서 본 것처럼 조건물을 쪼개면 이 리패거링을 수행하는 게 수월해진다.
// 하지만 매개변수에 따른 분배 로직이 함수 핵심 로직의 바깥에 해당할 때만 이용할 수 있다.
// 그런데 매개변수가 훨씬 까다로운 방식으로 사용될 때도 있다.

function delveryDate(anOrder, isRush) {
    let result;
    let deliveryTime;
    if (anOrder.deliveryState == "MA" || anOrder.deliveryState === "CT")
        deliveryTime = isRush ? 1 : 2;
    else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
        deliveryTime = 2;
        if (anOrder.deliveryState === "NH" && !isRush) deliveryTime = 3;
    } else if (isRush) deliveryTime = 3;
    else if (anOrder.deliveryState === "ME") deliveryTime = 3;
    else deliveryTime = 4;
    result = anOrder.placeOn.plusDays(2 + deliveryTime);
    if (isRush) result = result.minusDays(1);
    return result;
}

// 이 코드에서 isRush를 최상위 분배 조건문으로 뽑아내려면 생각보다 일이 커질 수도 있어 보인다.
// 그렇다면 deliveryDate()를 감싸는 래핑 함수를 생각해볼 수 있다.

function rushDeliveryDate(anOrder) {
    return delveryDate(anOrder, true);
}

function regularDeliveryDate(anOrder) {
    return delveryDate(anOrder, false);
}
