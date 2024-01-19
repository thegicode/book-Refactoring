/* export class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._discountRate = discountRate;
        this._contract = new CustomerContract(this.dateToday());
    }

    get discountRate() {
        return this._discountRate;
    }

    becomePreferred() {
        this._discountRate += 0.03;
    }

    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this._discountRate));
    }

    dateToday() {
        return new Date();
    }
}

class CustomerContract {
    constructor(startDate) {
        this._startDate = startDate;
    }
}
 */

export class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._contract = new CustomerContract(this.dateToday(), discountRate);
        this._setDiscountRate(discountRate);
    }

    get discountRate() {
        return this._contract.discountRate;
    }

    _setDiscountRate(aNumber) {
        this._contract.discountRate = aNumber;
    }

    becomePreferred() {
        this._setDiscountRate(this._contract._discountRate + 0.03);
    }

    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this._contract._discountRate));
    }

    dateToday() {
        return new Date();
    }
}

class CustomerContract {
    constructor(startDate, discountRate) {
        this._startDate = startDate;
        this._discountRate = discountRate;
    }

    get discountRate() {
        return this._discountRate;
    }

    set discountRate(value) {
        this._discountRate = value;
    }
}
