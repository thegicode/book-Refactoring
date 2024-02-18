// 10.6.1 Introduce Assertion
// 고객은 상품 구입 시 할인율을 적용받는다.

import { assert } from "chai";
{
    class Customer {
        applyDiscount(aNumber) {
            return this.discountRate
                ? aNumber - this.discountRate * aNumber
                : aNumber;
        }
    }

    /** 1.
     * 이 코드에는 할인율이 항상 양수라는 가정이 깔려 있다.
     * 어서션을 이용해 이 가정믈 명시해보자.
     * 3항 표현식에는 어서션을 넣을 장소가 적당치 않으니, 먼저 if-then 문장으로 재구성하자.
     */

    class Customer {
        applyDiscount(aNumber) {
            if (!this.discountRate) return this.aNumber;
            else return aNumber - this.discountRate * aNumber;
        }
    }

    /** 2.
     * 이제 간단히 어서션을 추가할 수 있다.
     */

    class Customer {
        applyDiscount(aNumber) {
            if (!this.discountRate) return this.aNumber;
            else {
                assert(this.discountRate >= 0);
                return aNumber - this.discountRate * aNumber;
            }
        }
    }

    /** 3.
     * 이번 예에서는 어서션을 세터 메서드에 추가하는 게 나아 보인다.
     */

    class Customer {
        set discountRate(aNumber) {
            assert(null === aNumber || aNumber >= 0);
            this._discountRate = aNumber;
        }
    }

    // 이런 어서션은 오류의 출처를 특정하기 어려울 때 특히 제값을 한다.
}
