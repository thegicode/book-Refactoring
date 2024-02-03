// 10.5 Introduce Special Case

// 전력 회사는 전력이 필요한 현장 site에 인프라를 설치해 서비스를 제공한다.

{
    class Site {
        constructor(customer) {
            this._customer = customer;
        }

        get customer() {
            return this._customer;
        }

        // 고객 이름
        get name() {
            //
        }

        // 요금제
        get billingPlan() {
            //
        }
        set billingPlan(arg) {
            //
        }

        // 납부 이력
        get paymentHistory() {}
    }
}

// "미확인 고객"

{
    /* 
    // client 1
    const aCustomer = site.customer;
    // ...
    let customerName;
    if (aCustomer === "unknown") customerName = "occupant";
    else customerName = aCustomer.name;

    // client 2
    const plan =
        aCustomer === "unknown"
            ? registry.billingPlans.basic
            : aCustomer.billingPlan;

    // client 3
    if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;

    // client 4
    const weeksDelinquent =
        aCustomer === "unknown"
            ? 0
            : aCustomer.paymentHistory.weeksDelinquentInLastYear; */
}

// 미확인 고객을 처리해야 하는 클라이언트가 여러 개 발견됐고, 그 대부분에서는 똑같은 방식을 처리했다.
// 고객이름으로는 "occupant"를 사용하고, 기본 요금제 billingPlan을 청구하고, 연체 delinquent 기간은 0주 week 로 분류한 것이다.
// 많은 곳에서 이뤄지는 이 특이 케이스 검사와 공통된 반응이 우리에게 특이 케이스 객체를 도입할 때 임을 말해준다.

/**
 * 1. 먼저 미확인 고객인지를 나타내는 메서드를 고객 클래스에 추가한다.
 */

{
    class Customer {
        get isUnknown() {
            return false;
        }
    }
}

/**
 * 2. 그런 다음 미확인 고객 잔용 클래스를 만든다.
 */
{
    class UnknownCustomer {
        get isUnknown() {
            return true;
        }
    }
}

// UnknownCustomer를 Customer의 서브클래스로 만들지 않았음을 주목하자.
// 다른 언어, 특히 정적 타입 언어였다면 서브클래스로 만들었을 것이다.
// 하지만, 자바스크립트의 서브클래스 규칙과 동적 타이핑 능력 때문에 이 경우엔 지금 예처럼 만드는 편이 낫다.

/**
 * 3. 지금부터 까다롭다.
 * "unknown"을 기대하는 곳 모두에 새로 만든 특이 케이스 객체(UnknownCustomer)를 반환하도록 하고,
 * 역시 값이 "unknown"인지를 검사하는 곳 모두에서 isUnknown() 메서드를 사용하도록 고쳐야 한다.
 * 한 번에 조금씩만 변경하고 테스트할 수 있는 잘 정돈된 코드가 필요해 보인다.
 * 그런데 Customer 클래스를 수정하여 "unknown" 문자열 대신 UnknownCustomer 객체를 반환하게 한다면,
 * 클라이언트들 각각에서 "unknown"인지를 확인하는 코드 모두를 isUnknown() 호출로 바꾸는 작업을 한 번에 해야만 한다.
 * 다시 말해, 전혀 매력적이지 않다.
 *
 * 이런 상황에 봉착할 때마다 내가 자주 사용하는 기법이 있다.
 * 여러 곳에서 똑같이 수정해야만 하는 코드를 함수로 추출하여 한데로 모으는 것이다.
 * 지금 예에서는 특이 케이스인지 확인하는 코드가 추출 대상이다.
 */

function isUnknown(arg) {
    if (!(arg instanceof Customer || arg === "unknown"))
        throw new Error(`잘못된 값과 비교: <${arg}>`);
    return arg === "unknown";
}

// 의도치 않은 값이 입력되면 에러를 던지도록 했다.
// 이렇게 하면 리팩터링 도중 실수를 저지르거나, 혹은 이상하게 동작하는 위치를 찾는 데 도움이 된다.
// 이제  isUnknown() 함수를 이용해 미확인 고객인지를 확인할 수 있다.
// 이 변경을 한 번에 하나씩만 적용하고 테스트해보자.

{
    /* 
    // client 1
    let customerName;
    if (isUnknown(aCustomer)) customerName = "occupant";
    else customerName = aCustomer.name;

    // client 2
    const plan = isUnknown(aCustomer)
        ? registry.billingPlans.basic
        : aCustomer.billingPlan;

    // client 3
    if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

    // client 4
    const weeksDelinquent = isUnknown(aCustomer)
        ? 0
        : aCustomer.paymentHistory.weeksDelinquentInLastYear; */
}

/**
 * 4. 특이 케이스일 때 Site 클래스가 UnknownCustomer 객체를 반환하도록 수정하자.
 */

{
    class Site {
        constructor(customer) {
            this._customer = customer;
        }

        get customer() {
            return this._customer === "unknown"
                ? new UnknownCustomer()
                : this._customer;
        }

        // 고객 이름
        get name() {
            //
        }

        // 요금제
        get billingPlan() {
            //
        }
        set billingPlan(arg) {
            //
        }

        // 납부 이력
        get paymentHistory() {}
    }
}

/**
 * 5. isUnknown() 함수를 수정하여 고객 객체의 속성을 사용하도록 하면 "unknown" 문자열을 사용하던 코드는 완전히 사라진다.
 */

{
    function isUnknown(arg) {
        if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
            throw new Error(`잘못된 값과 비교: <${arg}>`);
        return arg.isUnknown;
    }
}

/**
 * 6. 모든 기능이 잘 동작하는지 테스트한다.
 */

/**
 * 7. 이제부터가 재미있다.
 * 각 클라이언트에서 수행하는 특이 케이스 검사를 일반적인 기본값으로 대체할 수 있다면
 * 이 검사 코드에 여러 함수를 클래스로 묶기를 적용할 수 있다.
 * 지금 예에서는 미확인 고객의 이름으로 "occupant"를 사용하는 코드가 많다. client 1 처럼 말이다.
 * 다음과 같은 절절한 메서드를 UnknownCustomer 클래스에 추가하자.
 */
{
    class UnknownCustomer {
        get isUnknown() {
            return true;
        }

        // 추가
        get name() {
            return "occupant";
        }
    }
}
// 지금까지의 코드가 동작하는지 테스트한다.
// 그리고 나라면 이 변수를 인락인 할 것이다.

// 다음은 요금제 속성 차례다.

// client 2
{
    // const plan = isUnknown(aCustomer)
    //     ? registry.billingPlans.basic
    //     : aCustomer.billingPlan;
}

// client 3
{
    // if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
}

// 요금제 속성을 읽는 동작은 앞서 이름 속성을 처리한 과정을 그대로 반복할 것이다.
// 즉, 일반적인 기본값을 반복한다.
// 쓰는 동작은 조금 다르다.
// 현재 코드에서는 미확인 고객에 대해서는 세터를 호출하지 않는다.
// 겉보기 동작을 똑같게 만들어야 하므로 특이 케이스에서도 세터가 호출되도록 하되 세터에서는 아무런 일도 하지 않는다.
{
    class UnknownCustomer {
        get isUnknown() {
            return true;
        }

        get name() {
            return "occupant";
        }

        // 추가
        get billingPlan() {
            return registry.billingPlans.basic;
        }
        set billingPlan(arg) {
            // 무시한다.
        }
    }
}

{
    // 클라이언트(읽는 경우)
    // const plan = aCustomer.billingPlan;
    // 클라이언트(쓰는 경우)
    // aCustomer.billingPlan = newPlan;
}

// 특이 케이스는 값 객체다. 따라서 항상 불변이어야 한다.
// 대체하려는 값이 가변이더라도 마찬가지다.

// 마지막 상황은 더 복잡하다.
// 특이 케이스가 자신만의 속성을 갖는 또 다른 객체(지불 이력)을 반환해야 하기 때문이다.

// client 4
{
    /*  const weeksDelinquent = isUnknown(aCustomer)
        ? 0
        : aCustomer.paymentHistory.weeksDelinquentInLastYear; */
}

// 특이 케이스 객체가 다른 객체를 반환해야 한다면 그 객체 역시 특이 케이스여야 하는 것이 일반적이다.
// 그래서 NullPaymentHistory를 만들기로 했다.
{
    class UnknownCustomer {
        get isUnknown() {
            return true;
        }

        get name() {
            return "occupant";
        }

        get billingPlan() {
            return registry.billingPlans.basic;
        }
        set billingPlan(arg) {
            //
        }

        // 추가
        get paymentHistory() {
            return new NullPaymentHistory();
        }
    }

    class NullPaymentHistory {
        get weeksDelinquentInLastYear() {
            return 0;
        }
    }
}

// client 4
{
    /* const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear; */
}

/**
 * 8. 계속해서 모든 클라이언트의 코드를 이 다형적 행위(타입에 따라 동작이 달라진다는 뜻)로 대체할 수 있는지를 살펴본다.
 * 예외가 있을 수 있기 때문이다.
 * 특이 케이스부터 다른 클라이언트와는 다른 무언가를 원하는 독특한 클라이언트가 있을 수 있다.
 * 예컨대 미확인 고객의 이름으로 "occupant"를 사용하는 클라이언트가 23개나 되더라도 튀는 클라이언트가 하나쯤은 있을 수 있다.
 * 다름 클라이언트처럼 말이다.
 */

// 튀는 클라이언트
{
    /* const name = !isUnknown(aCustomer) ? aCustomer.name : "미확인 거주자"; */
}

// 이런 경우엔 원래의 특이 케이스 검사 코드를 유지해야 한다.
// 이 코드는 Customer에 선언된 메서드를 사용하도록 수정하면 되는데, 구체적으로는 isUnknown() 함수를 인라인하면 된다.

{
    /*  const name = aCustomer.isUnknown ? "미확인 거주자" : aCustomer.name; */
}

// 모든 클라이언트를 수정했다면, 호출하는 곳이 없어진 전역 isUnknown() 함수를 죽은 코드 제거하기로 없애준다.

/**
 * 최종 코드
 */

export class Site {
    constructor(customer) {
        this._customer = customer;
    }

    get customer() {
        return this._customer === "unknown"
            ? new UnknownCustomer()
            : this._customer;
    }
}

export class Customer {
    constructor(name, billingPlan, paymentHistory) {
        this._name = name;
        this._billingPlan = billingPlan;
        this._paymentHistory = paymentHistory;
    }

    get name() {
        return this._name;
    }

    get billingPlan() {
        return this._billingPlan;
    }
    set billingPlan(arg) {
        this._billingPlan = arg;
    }

    get paymentHistory() {
        return this._paymentHistory;
    }

    get isUnknown() {
        return false;
    }
}

export class UnknownCustomer {
    get name() {
        return "occupant";
    }

    get billingPlan() {
        return registry.billingPlans.basic;
    }
    set billingPlan(arg) {
        /* ignore */
    }

    get paymentHistory() {
        return new NullPaymentHistory();
    }
}

export class NullPaymentHistory {
    get weeksDelinquentInLastYear() {
        return 0;
    }
}

// client 1
export function customerName(site) {
    return site.customer.name;
}

// client 2
const registry = {
    billingPlans: {
        basic: "basic",
    },
};
export function billingPlan(site) {
    return site.customer.billingPlan;
}

// client 3
export function changeBillingPlan(site, newPlan) {
    site.customer.billingPlan = newPlan;
    return site.customer;
}

// client 4
export function weeksDelinquent(site) {
    return site.customer.paymentHistory.weeksDelinquentInLastYear;
}
