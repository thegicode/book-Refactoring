/**
 * 11.12 오류 코드를 예외로 바꾸기 Replace Error Code with Exception
 * 전역 테이블에서 배송지의 배송 규칙을 알아내는 코드
 * ReplaceErrorCodeWithException.js 전체 코드 리팩터링 과정
 */

{
    const status = calculateShippingCoasts(orderData);
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0) return shippingRules;
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else return -23;
    }
}

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0) return shippingRules;
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else return -23;
    }
}

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0) return shippingRules;
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else return -23;
    }

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

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError) {
            errorList.push({ order: OrderData, errorCode: e.code });
        } else throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0) return shippingRules;
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else return -23;
    }

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

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError) {
            errorList.push({ order: OrderData, errorCode: e.code });
        } else throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0) return shippingRules;
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else throw new OrderProcessingError(-23);
    }

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

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError) {
            errorList.push({ order: OrderData, errorCode: e.code });
        } else throw e;
    }
    if (status < 0) errorList.push({ order: OrderData, errorCode: status });

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        if (shippingRules < 0)
            throw new Error("오류 코드가 다 사라지지 않았습니다.");
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else throw new OrderProcessingError(-23);
    }

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

{
    let status;
    try {
        status = calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError) {
            errorList.push({ order: OrderData, errorCode: e.code });
        } else throw e;
    }

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else throw new OrderProcessingError(-23);
    }

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

{
    try {
        calculateShippingCoasts(orderData);
    } catch (e) {
        if (e instanceof OrderProcessingError) {
            errorList.push({ order: OrderData, errorCode: e.code });
        } else throw e;
    }

    function calculateShippingCoasts(anOrder) {
        // 관련 없는 코드
        const shippingRules = loacalShippingRules(anOrder.country);
        // 더 관련 없는 코드
    }

    function loacalShippingRules(country) {
        const data = countryData.shippingRules[country];
        if (data) return new ShippingRules(data);
        else throw new OrderProcessingError(-23);
    }

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
