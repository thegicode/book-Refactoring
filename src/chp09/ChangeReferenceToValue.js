// 0. Person 객체가 있고, 이 객체는 생성 시점에는 전화번호가 올바로 설정되지 못하게 짜여 있다고 해보자.
export class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }

    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber.areaCode = arg;
    }

    get officeNumber() {
        return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
        this._telephoneNumber.number = arg;
    }
}

class TelephoneNumber {
    constructor() {}

    get areaCode() {
        return this._areaCode;
    }
    set areaCode(arg) {
        this._areaCode = arg;
    }

    get number() {
        return this._number;
    }
    set number(arg) {
        this._number = arg;
    }
}

// 1. 가장 먼저 할 일은 전화번호를 불변으로 만들기
// 필드들의 세터들만 제거하면 된다. 세터 제거의 첫 단계로, 세터로 술정하던 두 필드를 생성자에서 입력받아 설정하도록 한다.

export class Person_1 {
    constructor(areaCode, number) {
        this._areaCode = areaCode;
        this._number = number;
    }

    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber_1(arg, this.officeNumber);
    }

    get officeNumber() {
        return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
        this._telephoneNumber = new TelephoneNumber_1(this.officeAreaCode, arg);
    }
}

class TelephoneNumber_1 {
    constructor(areaCode, number) {
        this._areaCode = areaCode;
        this._number = number;
    }

    get areaCode() {
        return this._areaCode;
    }
    set areaCode(arg) {
        this._areaCode = arg;
    }

    get number() {
        return this._number;
    }
    set number(arg) {
        this._number = arg;
    }
}

// 2. 이제 전화번호는 불변이 되었으니 진짜 '값'이 될 준비가 끝났다. 값 객체로 인정받으려면 동치성을 값 기반으로 평가해야 한다.

export class Person_2 {
    constructor() {}

    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber_2(arg, this.officeNumber);
    }

    get officeNumber() {
        return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
        this._telephoneNumber = new TelephoneNumber_2(this.officeAreaCode, arg);
    }
}

export class TelephoneNumber_2 {
    constructor(areaCode, number) {
        this._areaCode = areaCode;
        this._number = number;
    }

    get areaCode() {
        return this._areaCode;
    }
    set areaCode(arg) {
        this._areaCode = arg;
    }

    get number() {
        return this._number;
    }
    set number(arg) {
        this._number = arg;
    }

    equals(other) {
        if (!(other instanceof TelephoneNumber_2)) return false;
        return this.areaCode === other.areaCode && this.number === other.number;
    }
}
