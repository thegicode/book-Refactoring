/**
 * 11.10 명령을 함수로 바꾸기 Replace Command with Function
 * 작은 명령 객체에서 시작해보자.
 */

{
    class ChargeCalculator {
        constructor(customer, usage, provider) {
            this._customer = customer;
            this._usage = usage;
            this._provider = provider;
        }

        get baseCharge() {
            return this._customer.baseRate * this._usage;
        }

        get charge() {
            return this.baseCharge + this._provider.connectionCharge;
        }
    }

    // 호출자
    // monthCharge = new ChargeCalculator(customer, usage, provider).charge;
}
/**
 * 이 명령 클래스는 간단한 편이므로 함수로 대체하는 게 나아 보인다.
 * 첫 번째로, 이 클래스를 생성하고 호출하는 코드를 함께 함수로 추출(6.1절) 한다.
 */
{
    function charge(customer, usage, provider) {
        return new ChargeCalculator(customer, usage, provider);
    }

    class ChargeCalculator {
        constructor(customer, usage, provider) {
            this._customer = customer;
            this._usage = usage;
            this._provider = provider;
        }

        get baseCharge() {
            return this._customer.baseRate * this._usage;
        }

        get charge() {
            return this.baseCharge + this._provider.connectionCharge;
        }
    }

    // 호출자
    // monthCharge = charge(customer, usage, provider).charge;
}

/**
 * 이 때 보조 메서드들을 어떻게 다룰지 정해야 하는데, baseCharge()가 이러한 보조 메서드에 속한다.
 * 값을 반환하는 메서드라면 먼저 반환할 값을 변수로 추출(6.3절) 한다.
 * 그런 다음 보조 메서드를 인라인(6.3절) 한다.
 */

{
    function charge(customer, usage, provider) {
        return new ChargeCalculator(customer, usage, provider);
    }

    class ChargeCalculator {
        constructor(customer, usage, provider) {
            this._customer = customer;
            this._usage = usage;
            this._provider = provider;
        }

        // get baseCharge() {
        //     return this._customer.baseRate * this._usage;
        // }

        get charge() {
            const baseCharge = this._customer.baseRate * this._usage;
            return baseCharge + this._provider.connectionCharge;
        }
    }

    // 호출자
    // monthCharge = charge(customer, usage, provider).charge;
}

/**
 * 이제 로직 전체가 한 메서드에서 이뤄지므로, 그다음으로는 생성자에 전달되는 모든 데이터를 주 메서드로 옮겨야 한다.
 * 먼저 생성자가 받던 모든 매개변수를 charge() 메서드로 옮기기 위해 함수 선언 바꾸기(6.5절)를 적용한다.
 */

{
    function charge(customer, usage, provider) {
        return new ChargeCalculator(customer, usage, provider).charge(
            customer,
            usage,
            provider
        );
    }

    class ChargeCalculator {
        constructor(customer, usage, provider) {
            this._customer = customer;
            this._usage = usage;
            this._provider = provider;
        }

        charge(customer, usage, provider) {
            const baseCharge = this._customer.baseRate * this._usage;
            return baseCharge + this._provider.connectionCharge;
        }
    }

    // 호출자
    // monthCharge = charge(customer, usage, provider).charge;
}

/**
 * 이제 charge()의 본문에서 필드 대신 매개변수를 사용하도록 수정한다.
 */

{
    function charge(customer, usage, provider) {
        return new ChargeCalculator(customer, usage, provider).charge(
            customer,
            usage,
            provider
        );
    }

    class ChargeCalculator {
        constructor(customer, usage, provider) {}

        charge(customer, usage, provider) {
            const baseCharge = customer.baseRate * usage;
            return baseCharge + provider.connectionCharge;
        }
    }

    // 호출자
    // monthCharge = charge(customer, usage, provider).charge;
}

/**
 * 다 됐다면 최상위 charge() 함수로 인라인할 수 있다.
 * 이는 생성자와 메서드 호출을 함께 인라인하는 특별한 형태의 함수 인라인하기(6.2절)다.
 */

export function charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage;
    return baseCharge + provider.connectionCharge;
}

// 호출자
// monthCharge = charge(customer, usage, provider).charge;
