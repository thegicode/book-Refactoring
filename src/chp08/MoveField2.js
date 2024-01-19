import { assert } from "chai";

/* export class Account {
    constructor(number, type, interestRate) {
        this._number = number;
        this._type = type;
        this._interestRate = interestRate;
    }

    get interestRate() {
        return this._interestRate;
    }
}

export class AccountType {
    constructor(nameString) {
        this._name = nameString;
    }
} */

export class Account {
    constructor(number, type) {
        this._number = number;
        this._type = type;
        // assert((insterstRate = this._type.insterstRate));
        // this._interestRate = interestRate;
    }

    get interestRate() {
        return this._type.interestRate;
    }
}

export class AccountType {
    constructor(nameString, interestRate) {
        this._name = nameString;
        this._interestRate = interestRate;
    }

    get interestRate() {
        return this._interestRate;
    }
}
