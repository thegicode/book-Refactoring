import { ListFormat } from "typescript";

export class Order {
    constructor(aRecored) {
        this._data = aRecored;
    }

    get quantity() {
        return this._data.quantity;
    }

    get itemPrice() {
        return this._data.itemPrice;
    }

    get price() {
        this.basePrice - this.quantityDiscount + this.quantityDiscount;
    }

    get basePrice() {
        return order.quantity * order.itemPrice;
    }
    get quantityDiscount() {
        return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    }
    get quantityDiscount() {
        return Math.min(basePrice * 0.1, 100);
    }

    get price() {}
}
