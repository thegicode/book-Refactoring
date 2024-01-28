// Order 클래스는 주문 데이터를 생성자에서 JSON 문서로 입력받아 필드들을 채운다.
// 이 과정에서 주문 데이터에 포함된 고객 ID를 사용해 customer 객체를 생성한다.

class Order {
    constructor(data) {
        this._number = data.number;
        this._customer = new Customer(data.customer); // data.customer가 고객 ID
        // 다른 데이터를 읽어 들인다.
    }

    get customer() {
        return this._customer;
    }
}

class Customer {
    constructor(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }
}

// 고객 객체는 값이다.
// 고객ID가 123인 주문을 다섯 개 생성한다면 독립된 고객 객체가 다섯 개 만들어진다.
// 이중 하나를 수정하더라도 나머지 네 개에는 반영되지 않는다.
// 같은 엔티티를 표현하는 객체가 여러 개 만들어지면 혼란이 생긴다.

// 1. 항상 물리적으로 똑같은 고객 객체를 사용하고 싶다면 먼저 이 유일한 객체를 저장해둘 곳이 있어야 한다.
// 간단한 상황이라면 repository object를 사용하는 편이다.

let _repositoryData;
export function initilize() {
    _repositoryData = {};
    _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
    if (!_repositoryData.customer.has(id))
        _repositoryData.customers.set(id, new Customer(id));
    return findCustomer(id);
}

export function findCustomer(id) {
    return _repositoryData.customer.get(id);
}

// 이 저장소는 고객 객체를 ID와 함께 등록할 수 있으며, ID 하나당 오직 하나의 고객 객체만 생성됨을 보장한다.

// 2. 주문의 생성자에서 올바른 고객 객체를 얻어오는 방법을 강구해야 한다.
class Order_1 {
    constructor(data) {
        this._number = data.number;
        this._customer = registerCustomer(data.customer);
    }

    get customer() {
        return this._customer;
    }
}

// 350 이제 특정 주문과 관련된 고객 정보를 갱신하면 같은 고객을 공유하는 주문 모두에서 갱신된 데이트를 사용하게 된다.
// 이 예시코드는 생성자 본문이 전역 저장소와 결합된다는 문제가 있다.
//    -> 저장소를 생성자 매개변수로 전달하도록 수정하자. -> 의존성 주입(dependency injection)중 생성자 주입을 말한다.
