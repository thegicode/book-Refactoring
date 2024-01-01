import { assert } from "chai";

export class Book {
    constructor() {
        this._reservation = [];
    }

    addReservation(customer) {
        this.zz_addReservation(customer, false);
    }

    zz_addReservation(customer, isPriority) {
        assert(isPriority === true || isPriority === false);
        this._reservation.push(customer);
    }
}

const book = new Book();

book.addReservation("na");
