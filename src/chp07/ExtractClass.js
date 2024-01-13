export class Person {
    constructor(name, areaCode, number) {
        this._name = name;
        this._telephoneNumber = new TelephoneNumber(areaCode, number);
    }

    get name() {
        return this._name;
    }
    set name(arg) {
        this._name = arg;
    }

    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    // set officeAreaCode(arg) {
    //     this._telephoneNumber.areaCode = arg;
    // }

    get officeNumber() {
        return this._telephoneNumber.number;
    }
    // set officeNumber(arg) {
    //     this._telephoneNumber.number = arg;
    // }

    get telephoneNumber() {
        return this._telephoneNumber.toString();
    }
}

class TelephoneNumber {
    constructor(area, number) {
        this._areaCode = area;
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

    toString() {
        return `(${this._areaCode}) ${this._number}`;
    }
}
