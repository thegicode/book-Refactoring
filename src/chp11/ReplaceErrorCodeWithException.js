/**
 * 11.12 오류 코드를 예외로 바꾸기 Replace Error Code with Exception
 * 전역 테이블에서 배송지의 배송 규칙을 알아내는 코드
 */

{
    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else return -23;
    }
}
/**
 * 이 코드는 국가 정보(countery)가 유효한지를 이 함수 호츨 전에 다 검증했다고 가정한다.
 * 따라서 이 함수에서 오류가 난다면 무언가 잘못됐음을 뜻한다.
 * 다음과 같이 호출한 곳에서는 반환된 오류 코드를 검사하여 오류가 발견되면 위로 전파한다.
 */

{
    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0) return shippingRules;
        // 더 관련 없는 코드
    }
}

// 더 윗단 함수는 오류를 낸 주문을 오류 목록(errorList)에 넣는다.

// 최상위
{
    const status = calculateShippingCoasts(orderData);
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });
}
/**
 * 여기서 가장 먼저 고려할 것은 이 오류가 '예상된 것이냐'다
 * loacalShippingRules()는 배송규칙들이 countryData에 제대로 반영되어 있다고 가정해되 되나?
 * country 인수가 전역 데이터에 저장된 키들과 일치하는 곳에서 가져온 것인가, 아니면 앞서 검증을 받았나?
 * 이 질문들의 답이 긍정적이면 (즉, 예상할 수 있는 정상 동작 범주에 든다면) 오류 코드를 예외로 바꾸는 이번 리팩터링을 적용할 준비가 된 것이다.
 *
 * 가장 먼저 최상위에 예외 핸드러를 갖춘다.
 * loacalShippingRules() 호출을 try 블록으로 감싸려 하지만 처리 로직은 포함하고 싶지 않다.
 * 그런데 다음처럼 할 수는 '없다'.
 */

// 최상위
{
    try {
        const status = calculateShippingCoasts(orderData);
    } catch (e) {
        // 에외 처리 로직
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });
}

/**
 * 이렇게 하면 status의 유효범위가 try 블록으로 국한되어 조건문에서 검사할 수 없기 때문이다.
 * 그래서 status의 선언과 초기화를 분리해야 한다.
 * 평소라면 좋아하지 않을 방식이지만 지금은 어쩔 수 없다.
 */

{
    let status;
    status = calculateShippingCoasts(orderData);
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });
}

// 이제 함수 호출을 try/catch 블록으로 감쌀 수 있다.

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });
}

/**
 * 잡은 에외는 모두 다시 던져야 한다.
 * 다른 곳에서 발생한 예외를 무심코 삼켜버리고 싶진 않을 테니 말이다.
 *
 * 호출하는 쪽 코드의 다른 부분에서도 주문을 오류 목록에 추가할 일이 있을 수 있으니 적적한 핸들러가 이미 구비되어 있을 수 있다.
 * 그렇다면 그 try 블록을 수정해서 calculateShippingCoasts() 호출을 포함시킨다.
 *
 * 이번 리팩터링으로 추가된 예외만을 처리하고자 한다면 다른 예외와 구별할 방법이 필요하다.
 * 별도의 클래스를 만들어서 할 수도 있고 특별한 값을 부여하는 방법도 있다.
 * 예외를 클래스 기반으로 처리하는 프로그래밍 언어가 많은데, 이런 경우라면 서브클래스를 만드는 게 가장 자연스럽다.
 * (현재의) 자바스크립트는 여기 해당하지 않지만, 나는 다음처럼 하는 걸 좋아한다.
 */

{
    class OrderProcessingError extends Error {
        constructor(errorCode) {
            super(`주문 처리 오류: ${errorCode}`);
            this.code = errorCode;
        }

        get name() {
            return "OrderProcessingError";
        }
    }
}

/**
 * 이 클래스가 준비되면 오류 코드를 처리할 때와 같은 방식으로 이 예외 클래스를 처리하는 로직을 추가할 수 있따.
 */

{
    // 최상위
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError)
            errorList.push({ order: orderData, errorCode: e.code });
        else throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });
}

// 그런 다음 오류 검출 코드를 수정하여 오류 코드 대신 이 예외를 던지도록 한다.

{
    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else throw new OrderProcessingError(-23);
    }
}

/**
 * 코드를 다 작성했고 테스트도 통과했다면 오류 코드를 전파하는 임시 코드를 제거할 수 있다.
 * 하지만 나라면 먼저 다음처럼 함정을 추가한 후 테스트해볼 것이다.
 */

{
    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0)
            throw new Error("오류 코드가 다 사라지지 않았습니다."); //
        // 더 관련 없는 코드
    }
}

/**
 * 이 함정에 걸려들지 않았다면 이 줄 전체를 제거해도 안전하다.
 * 오류를 콜스택 위로 전달하는 일은 예외 메커니즘 대신 처리해줄 것이기 때문이다.
 */

{
    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        // if (shippingRules < 0)
        //     throw new Error("오류 코드가 다 사라지지 않았습니다.");
        // 더 관련 없는 코드
    }

    // 최상위
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError)
            errorList.push({ order: orderData, errorCode: e.code });
        else throw e;
    }
    // if (status < 0) errorList.push({ order: OrderData, errorCode: status });
}

/**
 * 이제는 필요 없어진 status 변수 역시 제거할 수 있다.
 */

{
    // let status;
    try {
        // status = calculateShippingCoasts(orderData);
        calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError)
            errorList.push({ order: orderData, errorCode: e.code });
        else throw e;
    }
}
