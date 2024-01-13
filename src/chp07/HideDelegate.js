export class Person {
    constructor(name, aDepartment) {
        this._name = name;
        this._department = aDepartment;
    }

    get name() {
        return this._name;
    }

    // get department() {
    //     return this._department;
    // }
    // set department(arg) {
    //     this._department = arg;
    // }

    // 위임 메서드 추가

    get manager() {
        return this._department.manager;
    }

    get chargeCode() {
        return this._department.chargeCode;
    }
}

export class Department {
    constructor(aManager, aChargeCode) {
        this._manager = aManager;
        this._chargeCode = aChargeCode;
    }

    get chargeCode() {
        return this._chargeCode;
    }
    set chargeCode(arg) {
        this._chargeCode = arg;
    }

    get manager() {
        return this._manager;
    }
    set manager(arg) {
        this._manager = arg;
    }
}

/* 클라이언트에서 어떤 사람이 속한 부서의 관리자를 알고 싶다. */

// manager = aPerson.department.manager;

// 클라이언트는 부서 클래스의 작동 방식, 다시 말해 부서 클래스가 관리자 정보를 제공한다는 사실을 알아야 한다.
// 이러한 의존성을 줄이려면 클라이언트가 부서 클래스를 볼 수 없게 숨기고, 대신 사람 클래스에 간단한 위임 메서드를 만들면 된다.

// manager = aPerson.manager;
