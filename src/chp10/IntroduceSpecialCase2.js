// 10.5.2 Introduce Special Case

const registry = {
    billingPlans: {
        basic: "basic",
    },
};
{
    class Site {
        constructor(customer) {
            this._customenr = customer;
        }

        get customer() {
            return this._customenr;
        }
    }

    class Customer {
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
    }

    // client 1
    function customerName(site) {
        const aCustomer = site.customer;
        //
        let customerName;
        if (aCustomer === "unknown") customerName = "occupant";
        else customerName = aCustomer.name;
        return customerName;
    }

    // client 2
    function billingPlan(site) {
        const aCustomer = site.customer;
        const plan =
            aCustomer === "unknown"
                ? registry.billingPlans.basic
                : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent(site) {
        const aCustomer = site.customer;
        const weeksDelinquent =
            aCustomer === "unknown"
                ? 0
                : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/**
 * 1. 앞의 예와 같이, 먼저 고객에 isUnknown() 속성을 추가하고,
 * 2. 이 필드를 포함하는 특이 케이스 객체를 생성한다.
 * 차이점이라면 이번에는 특이 케이스가 리터럴이다.
 */
{
    // 2 함수 추가
    function createUnknownCustomer() {
        return {
            isUnknown: true,
        };
    }

    class Site {
        constructor(customer) {
            this._customenr = customer;
        }

        get customer() {
            return this._customenr;
        }
    }

    class Customer {
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

        // 1. 추가
        get isUnknown() {
            return false;
        }
    }

    // client 1
    function customerName(site) {
        const aCustomer = site.customer;
        //
        let customerName;
        if (aCustomer === "unknown") customerName = "occupant";
        else customerName = aCustomer.name;
        return customerName;
    }

    // client 2
    function billingPlan(site) {
        const aCustomer = site.customer;
        const plan =
            aCustomer === "unknown"
                ? registry.billingPlans.basic
                : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent(site) {
        const aCustomer = site.customer;
        const weeksDelinquent =
            aCustomer === "unknown"
                ? 0
                : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/**
 * 3. 특이 케이스 조건 검사 부분을 함수로 추출한다.
 */
{
    function createUnknownCustomer() {
        return {
            isUnknown: true,
        };
    }

    // 추가
    function isUnknown(arg) {
        return arg === "unknown";
    }

    class Site {
        constructor(customer) {
            this._customenr = customer;
        }

        get customer() {
            return this._customenr;
        }
    }

    class Customer {
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

    // client 1
    function customerName(site) {
        const aCustomer = site.customer;
        let customerName;
        if (isUnknown(aCustomer)) customerName = "occupant"; // 수정
        else customerName = aCustomer.name;
        return customerName;
    }

    // client 2
    function billingPlan(site) {
        const aCustomer = site.customer;
        const plan = isUnknown(aCustomer) // 수정
            ? registry.billingPlans.basic
            : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent(site) {
        const aCustomer = site.customer;
        const weeksDelinquent = isUnknown(aCustomer) // 수정
            ? 0
            : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/**
 * 4. 조건을 검사하는 코드와 Site 클래스에서 이 특이 케이스를 이용하도록 수정한다.
 */

{
    function createUnknownCustomer() {
        return {
            isUnknown: true,
        };
    }

    function isUnknown(arg) {
        return arg.isUnknown; // 수정
    }

    class Site {
        constructor(customer) {
            this._customenr = customer;
        }

        get customer() {
            // 수정
            return this._customenr === "unknown"
                ? createUnknownCustomer()
                : this._customenr;
        }
    }

    class Customer {
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

    // client 1
    function customerName(site) {
        const aCustomer = site.customer;
        let customerName;
        if (isUnknown(aCustomer)) customerName = "occupant";
        else customerName = aCustomer.name;
        return customerName;
    }

    // client 2
    function billingPlan(site) {
        const aCustomer = site.customer;
        const plan = isUnknown(aCustomer)
            ? registry.billingPlans.basic
            : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent(site) {
        const aCustomer = site.customer;
        const weeksDelinquent = isUnknown(aCustomer)
            ? 0
            : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/**
 * 7. 다음으로, 각각의 표준 응답을 적절한 리터럴 값으로 대체한다. 이름부터 해보자.
 */
{
    function createUnknownCustomer() {
        return {
            isUnknown: true,
            name: "occupant", // 추가
        };
    }

    function isUnknown(arg) {
        return arg.isUnknown;
    }

    class Site {
        constructor(customer) {
            this._customenr = customer;
        }

        get customer() {
            return this._customenr === "unknown"
                ? createUnknownCustomer()
                : this._customenr;
        }
    }

    class Customer {
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

    // client 1
    function customerName(site) {
        const aCustomer = site.customer;
        const customerName = aCustomer.name; // 수정
        return customerName;
    }

    // client 2
    function billingPlan(site) {
        const aCustomer = site.customer;
        const plan = isUnknown(aCustomer)
            ? registry.billingPlans.basic
            : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent(site) {
        const aCustomer = site.customer;
        const weeksDelinquent = isUnknown(aCustomer)
            ? 0
            : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

// 다음은 요금 차례다.
{
    function createUnknownCustomer() {
        return {
            isUnknown: true,
            name: "occupant",
            billingPlan: registry.billingPlans.basic, // 추가
        };
    }

    function isUnknown(arg) {
        return arg.isUnknown;
    }

    class Site {
        constructor(customer) {
            this._customenr = customer;
        }

        get customer() {
            return this._customenr === "unknown"
                ? createUnknownCustomer()
                : this._customenr;
        }
    }

    class Customer {
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

    // client 1
    function customerName(site) {
        const aCustomer = site.customer;
        const customerName = aCustomer.name;
        return customerName;
    }

    // client 2
    function billingPlan(site) {
        const aCustomer = site.customer;
        const plan = aCustomer.billingPlan; // 수정
        return plan;
    }

    // client 3
    function weeksDelinquent(site) {
        const aCustomer = site.customer;
        const weeksDelinquent = isUnknown(aCustomer)
            ? 0
            : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

// 비슷한 방법으로 납부 이력이 없다는 정보를 중첩 리터럴로 생성한다.

function createUnknownCustomer() {
    return {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
        // 추가
        paymentHistory: {
            weeksDelinquentInLastYear: 0,
        },
    };
}

export class Site {
    constructor(customer) {
        this._customenr = customer;
    }

    get customer() {
        return this._customenr === "unknown"
            ? createUnknownCustomer()
            : this._customenr;
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

// client 1
export function customerName(site) {
    const aCustomer = site.customer;
    const customerName = aCustomer.name;
    return customerName;
}

// client 2
export function billingPlan(site) {
    const aCustomer = site.customer;
    const plan = aCustomer.billingPlan;
    return plan;
}

// client 3
export function weeksDelinquent(site) {
    const aCustomer = site.customer;
    const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear; // 수정
    return weeksDelinquent;
}

// 리터럴을 이런 식으로 사용하려면 불변으로 만들어야 한다. (freeze() 메서드를 이용하면 된다.)
// 참고로 나는 이 방식보다는 클래스를 사용하는 쪽을 선호한다.
