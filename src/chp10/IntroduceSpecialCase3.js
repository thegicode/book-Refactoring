import _ from "lodash";

// 10.5.3 Introduce Special Case
// 변환 함수 이용하기

const registry = {
    billingPlans: {
        basic: "basic",
    },
};

export function acquireSiteData(data) {
    return new Site(
        new Customer(
            data.customer.name,
            data.customer.billingPlan,
            data.customer.paymentHistory
        )
    );
}

function createUnknownCustomer() {
    return {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
        paymentHistory: {
            weeksDelinquentInLastYear: 0,
        },
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
}

// client 1
{
    function customerName(site) {
        const aCustomer = site.customer;

        let customerName;
        if (aCustomer === "unknown") customerName = "occupant";
        else customerName = aCustomer.name;
        return customerName;
    }

    // client 2
    function billingPlan() {
        const plan =
            aCustomer === "unknown"
                ? registry.billingPlans.basic
                : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent() {
        const weeksDelinquent =
            aCustomer === "unknown"
                ? 0
                : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/**
 * 1. 처음 할 일은 현장 데이터 구조를 변환 함수인 enrichSite()에 통과시키는 것이다.
 * 이 함수는 아직 특별한 적업 없이 deep copy만 수행한다.
 *  참고로 나는 본질은 같고 정보만 덧붙이는 변환 함수의 이름을 "enrich"라 하고, 형태가 변할 때만 "transform"이라는 이름을 붙인다.
 */

// client 1
{
    function customerName() {
        const rawSite = acquireSiteData();
        const site = enricehSite(rawSite);
        const aCustomer = site.customer;

        let customerName;
        if (aCustomer === "unknown") customerName = "occupant";
        else customerName = aCustomer.name;

        return customerName;

        function enricehSite(inputSite) {
            return _.cloneDeep(inputSite);
        }
    }
}

/** 2.
 * 알려지지 않은 고객인지 검사하는 로직을 함수로 추출한다.
 */
{
    function isUnknown(aCustomer) {
        return aCustomer === "unknown";
    }

    function customerName() {
        const rawSite = acquireSiteData();
        const site = enricehSite(rawSite);
        const aCustomer = site.customer;

        let customerName;
        if (isUnknown(aCustomer)) customerName = "occupant";
        else customerName = aCustomer.name;

        return customerName;
    }

    function enricehSite(inputSite) {
        return _.cloneDeep(inputSite);
    }

    // client 2
    function billingPlan() {
        const plan = isUnknown(aCustomer)
            ? registry.billingPlans.basic
            : aCustomer.billingPlan;

        return plan;
    }

    // client 3
    function weeksDelinquent() {
        const weeksDelinquent = isUnknown(aCustomer)
            ? 0
            : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/** 3.
 * 고객 레코드에 isUnknown() 속성을 추가하여 현장 정보를 보강 enrich 한다.
 */

{
    // client 1
    function customerName() {
        const rawSite = acquireSiteData();
        const site = enricehSite(rawSite);
        const aCustomer = site.customer;

        let customerName;
        if (isUnknown(aCustomer)) customerName = "occupant";
        else customerName = aCustomer.name;

        return customerName;
    }

    function enricehSite(aSite) {
        const result = _.cloneDeep(aSite);
        const unknownCustomer = {
            isUnknown: true,
        };

        if (isUnknown(result.customer)) result.customer = unknownCustomer;
        else result.customer.isUnknown = false;

        return result;
    }
}

/** 4.
 * 그런 다음 특이 케이스 검사 시 새로운 속성을 이용하도록 수정한다.
 * 원래의 검사도 유지하여 입력이 원래의 rawSite든 보강(변환된 site든 상관없이 테스트가 동작하도록 해준다.
 */

{
    function isUnknown(aCustomer) {
        if (aCustomer === "unknown") return true;
        else return aCustomer.isUnknown;
    }
}

/** 5.
 * 모든 기능이 잘 동작하는지 테스트한 다음 특이 케이스에 여러 함수를 변환 함수로 묶기를 적용한다.
 * 먼저 이름 선택 부분을 enrichSite() 함수로 옮긴다.
 */

{
    function enricehSite(aSite) {
        const result = _.cloneDeep(aSite);
        const unknownCustomer = {
            isUnknown: true,
            name: "occupant",
        };

        if (isUnknown(result.customer)) result.customer = unknownCustomer;
        else result.customer.isUnknown = false;

        return result;
    }

    // client 1
    function customerName() {
        const rawSite = acquireSiteData();
        const site = enricehSite(rawSite);
        const aCustomer = site.customer;

        const customerName = aCustomer.name;

        return customerName;
    }
}

/** 6.
 * 테스트한 후 요금제에도 적용한다.
 */

{
    function enricehSite(aSite) {
        const result = _.cloneDeep(aSite);
        const unknownCustomer = {
            isUnknown: true,
            name: "occupant",
            billingPlan: registry.billingPlans.basic,
        };

        if (isUnknown(result.customer)) result.customer = unknownCustomer;
        else result.customer.isUnknown = false;

        return result;
    }

    // client 2
    function billingPlan() {
        const plan = aCustomer.billingPlan;

        return plan;
    }
}
/** 7.
 * 또 테스트한 후 마지막 클라이언트까지 수정한다.
 */
{
    function enricehSite(aSite) {
        const result = _.cloneDeep(aSite);
        const unknownCustomer = {
            isUnknown: true,
            name: "occupant",
            billingPlan: registry.billingPlans.basic,
            paymentHistory: {
                weeksDelinquentInLastYear: 0,
            },
        };

        if (isUnknown(result.customer)) result.customer = unknownCustomer;
        else result.customer.isUnknown = false;

        return result;
    }

    // client 3
    function weeksDelinquent() {
        const weeksDelinquent =
            aCustomer.paymentHistory.weeksDelinquentInLastYear;
        return weeksDelinquent;
    }
}

/** 8.
 * 최종 코드
 */

function isUnknown(aCustomer) {
    if (aCustomer.name === "unknown") return true;
    else return aCustomer.isUnknown;
}

function enricehSite(aSite) {
    let result = _.cloneDeep(aSite);
    const unknownCustomer = {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
        paymentHistory: {
            weeksDelinquentInLastYear: 0,
        },
    };

    if (isUnknown(result.customer)) result.customer = unknownCustomer;
    else result.customer.isUnknown = false;

    return result;
}

// client 1
export function customerName(rawSite) {
    const site = enricehSite(rawSite);
    const aCustomer = site.customer;
    return aCustomer.name;
}

// client 2
export function billingPlan(aCustomer) {
    return aCustomer.billingPlan;
}

// client 3
export function weeksDelinquent(aCustomer) {
    return aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
