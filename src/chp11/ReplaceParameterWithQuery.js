/**
 *  11.5 매개변수를 질의 함수로 바꾸기 Replace Parameter with Query
 */

{
    class Order {
        constructor(quantity, itemPrice) {
            this.quantity = quantity;
            this.itemPrice = itemPrice;
        }

        get finalPrice() {
            const basePrice = this.quantity * this.itemPrice;
            let discountLevel;
            if (this.quantity > 100) discountLevel = 2;
            else discountLevel = 1;
            return this.discountedPrice(basePrice, discountLevel);
        }

        discountedPrice(basePrice, discountLevel) {
            switch (discountLevel) {
                case 1:
                    return basePrice * 0.95;
                case 2:
                    return basePrice * 0.9;
            }
        }
    }
}

// 함수를 간소화하다 보면 임시 변수를 질의 함수로 바꾸기 7.4절 를 적용할 때가 많다.
// 이를 앞의 finalPrice() 함수에 적용하면 다음처럼 변한다.

{
    class Order {
        constructor(quantity, itemPrice) {
            this.quantity = quantity;
            this.itemPrice = itemPrice;
        }

        get finalPrice() {
            const basePrice = this.quantity * this.itemPrice;
            // let discountLevel;
            // if (this.quantity > 100) discountLevel = 2;
            // else discountLevel = 1;
            return this.discountedPrice(basePrice, this.discountLevel);
        }

        get discountLevel() {
            return this.quantity > 100 ? 2 : 1;
        }

        discountedPrice(basePrice, discountLevel) {
            switch (discountLevel) {
                case 1:
                    return basePrice * 0.95;
                case 2:
                    return basePrice * 0.9;
            }
        }
    }
}
// 그 결과로 discountedPrice() 함수에 discountLevel()의 반환 값을 건넬 이유가 사라졌다.
// 필요할 때 직접 호출하면 되기 때문이다.

// 이 매개변수를 참조하는 코드를 모두 함수 호출로 바꿔보자.
{
    class Order {
        constructor(quantity, itemPrice) {
            this.quantity = quantity;
            this.itemPrice = itemPrice;
        }

        get finalPrice() {
            const basePrice = this.quantity * this.itemPrice;
            return this.discountedPrice(basePrice, this.discountLevel);
        }

        get discountLevel() {
            return this.quantity > 100 ? 2 : 1;
        }

        discountedPrice(basePrice, discountLevel) {
            switch (this.discountLevel) {
                case 1:
                    return basePrice * 0.95;
                case 2:
                    return basePrice * 0.9;
            }
        }
    }
}

// 이제 함수 선언바꾸기(6.5절)로 이 매개변수를 없앨 수 있다.
export class Order {
    constructor(quantity, itemPrice) {
        this.quantity = quantity;
        this.itemPrice = itemPrice;
    }

    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        return this.discountedPrice(basePrice);
    }

    get discountLevel() {
        return this.quantity > 100 ? 2 : 1;
    }

    discountedPrice(basePrice) {
        switch (this.discountLevel) {
            case 1:
                return basePrice * 0.95;
            case 2:
                return basePrice * 0.9;
        }
    }
}
