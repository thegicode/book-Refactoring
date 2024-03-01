/**
 * 11.3 플래그 인수 제거하기 Remove Flag Argument
 * 배송일자를 계산하는 호출
 */

{
    {
        aShipment.deliveryDate = deliveryDate(anOrder, true);
    }
    {
        aShipment.deliveryDate = deliveryDate(anOrder, false);
    }

    // 이 불리언 값이 뭘 의미하지?

    function deliveryDate(anOrder, isRush) {
        if (isRush) {
            let deliveryTime;
            if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
            else if (["NY", "NH"].includes(anOrder.deliveryState))
                deliveryTime = 2;
            else deliveryTime = 3;
            return anOrder.placeOn.plusDays(1 + deliveryTime);
        } else {
            let deliveryTime;
            if (["MA", "CT", "NY"].includes(anOrder.deliveryState))
                deliveryTime = 2;
            else if (["ME", "NH"].includes(anOrder.deliveryState))
                deliveryTime = 3;
            else deliveryTime = 4;
            return anOrder.placeOn.plusDays(2 + deliveryTime);
        }
    }

    function rushDeliveryDate(anOrder) {
        let deliveryTime;
        if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
        else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
        else deliveryTime = 3;
        return anOrder.placeOn.plusDays(1 + deliveryTime);
    }

    function regularDeliveryDate(anOrder) {
        let deliveryTime;
        if (["MA", "CT", "NY"].includes(anOrder.deliveryState))
            deliveryTime = 2;
        else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
        else deliveryTime = 4;
        return anOrder.placeOn.plusDays(2 + deliveryTime);
    }
}

/* 호출하는 쪽에서는 이 불리언 리터럴 값을 이용해서 어느 쪽 코드를 실행할지를 정한 것이다.
전형적인 플래그 인수다.
명시적인 함수를 사용해 호출자의 의도를 분명히 밝히는 편이 나을 것이다.
 */

// 1. 조건문 분해하기 10.1절 를 적용

{
    function deliveryDate(anOrder, isRush) {
        if (isRush) return rushDeliveryDate(anOrder);
        else return regularDeliveryDate(anOrder);
    }

    function rushDeliveryDate(anOrder) {
        let deliveryTime;
        if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
        else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
        else deliveryTime = 3;
        return anOrder.placeOn.plusDays(1 + deliveryTime);
    }

    function regularDeliveryDate(anOrder) {
        let deliveryTime;
        if (["MA", "CT", "NY"].includes(anOrder.deliveryState))
            deliveryTime = 2;
        else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
        else deliveryTime = 4;
        return anOrder.placeOn.plusDays(2 + deliveryTime);
    }

    {
        aShipment.deliveryDate = rushDeliveryDate(anOrder);
    }
    {
        aShipment.deliveryDate = regularDeliveryDate(anOrder);
    }
}
