/**
 * 12.10.1 서브클래스를 위임으로 바꾸기 Replace Subclass with Delegate
 * 서브클래스가 하나일 때
 * 공연 예약 booking
 */

{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }
    }
}
// 그리고 추가 비용을 다양하게 설정할 수 있는 프리미엄 예약용 서브클래스가 있다.

{
    class PremiunBooking extends Booking {
        constructor(show, date, extras) {
            super(show, date);
            this._extras = extras;
        }
    }
}
/**
 * 프리미엄 예약은 슈퍼클래스를 상속해 제법 많은 걸 변경한다.
 * 다름에 기반한 프로그래밍 방식에서 볼 수 있는 전형적인 모습으로,
 * 서브클래스에서 슈퍼클래스의 메서드 일부를 오버라이드 하거나,
 * 몇몇 서브클래스에만 필요한 메서드를 몇 개 추가하는 식이다.
 * 모든 경우를 다 살펴보지는 않고 재미난 부분만 몇 개 짚어 보겠다.
 *
 * 첫째, 간단한 오버라이드 메서드가 하나 있다.
 * 다음 코드처럼 일반 예약은 공연 후 관객과의 대화 talkback 시간을 성수기가 아닐 때만 제공한다.
 */

{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }
    }
}

// 프르미엄 예약은 이를 오버라이드하여 항상 관객과의 대화 시간을 마련한다.
{
    class PremiunBooking extends Booking {
        constructor(show, date, extras) {
            super(show, date);
            this._extras = extras;
        }

        get hasTalkback() {
            return this._show.hasOwnProperty("talkback");
        }
    }
}

// 비슷하게, 가격 결정도 슈퍼클래스의 메서드를 호출해 추가 요금을 더하는 식으로 오버라이드 한다.

{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return result;
        }
    }

    class PremiunBooking extends Booking {
        constructor(show, date, extras) {
            super(show, date);
            this._extras = extras;
        }

        get hasTalkback() {
            return this._show.hasOwnProperty("talkback");
        }

        get basePrice() {
            return Math.round(super.basePrice + this._extras.premiunFee);
        }
    }
}

// 마지막은 슈퍼클래스에는 없는 기능을 프리미엄 예약에서 제공하는 예다.
{
    class PremiunBooking extends Booking {
        constructor(show, date, extras) {
            super(show, date);
            this._extras = extras;
        }

        get hasTalkback() {
            return this._show.hasOwnProperty("talkback");
        }

        get basePrice() {
            return Math.round(super.basePrice + this._extras.premiunFee);
        }

        get hasDinner() {
            return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
        }
    }
}
/**
 * 이 예에는 상속이 잘 들어맞는다.
 * 현실은 방금 설명한 것만큼 완벽하지많은 않다.
 * 슈퍼클래스에는 서브클래스에 의해 완성되는, 즉 서브클래스 없이는 불완전한 어떤 구조가 존재할 수 있다.
 * 예컨대 일련의 큰 동작의 일부를 서브클래스에서 오버라이드하여 빈 곳을 매꿔주도록 설계된 메서드가 여기 속한다.
 * 슈퍼클래스를 수정할 때 굳이 서브클래스까지 고려할 필요가 없는 게 보통이지만,
 * 이 무지로 인해 서브클래스의 동작을 망가뜨리는 상황이 닥칠 수 있다.
 * 하지만 이런 경우가 흔치 않다면 (그리고 서브클래스가 망가지는지를 확인하는 테스트들을 만들어두면) 상속은 충분한 값어치를 한다.
 *
 * 그렇다면 이런 행복한 상황에서 나는 왜 서브클래스를 위임으로 바꾸려 할까?
 * 상속은 한 번만 사용할 수 있는 도구다.
 * 따라서 상속을 사용해야 할 다른 이유가 생긴다면,
 * 그리고 그 이유가 프리미엄 예약 서브클래스보다 가치가 크다고 생각된다면
 * 프리미엄 예약을 (상속이 아닌) 다른 방식으로 표현해야 할 것이다.
 * 또한, 기본 예약에서 프리미엄 예약으로 동적으로 전환할 수 있도록 해야 할 수도 있다.
 * 예컨대 aBooking.bePremiun() 같은 메서드를 추가하는 식으로 말이다.
 * 완전히 새로운 객체를 만들어서 이런 상황을 피해갈 수 있는 경우도 있을 것이다.
 * 흔한 예로, HTTP 요청을 통해 서버로부터 새로운 데이터를 받아올 수 있다.
 * 하지만 처음부터 새로 만드는 방법을 사용할 수 없고, 대신 데이터 구조를 수정해야 할 때도 있다.
 * 그런데 이 방식으로는 수많은 곳에서 참조되는 예약 인스턴스를 다른 것으로 교체하기 어렵다.
 * 이런 상황이라면 기본 예약에서 프리미엄 예약으로 (혹은 거꾸로) 전환할 수 있게 하면 유용하다.
 *
 * 이러한 요구가 커지면서 서브클래스를 위임으로 바꾸는 게 좋다.
 * 다음과 같이 두 예약 클래스의 생성자를 호출하는 클라이언트들이 있다고 해보자.
 */

{
    // 클라이언트(일반예약)
    aBooking = new Booking(show, date);

    // 클라이언트(프로미엄 예약)
    aBooking = new PremiunBooking(show, date, extras);
}

// 서브클래스를 제거하려면 수정할 게 많으니 먼저 생성자를 팩터리 함수로 바꿔서 (11.8절) 생성자 호출 부분을 캡슐화하자.

{
    // 최상위
    function createBooking(show, date) {
        return new Bookin(show, date);
    }

    function createPrimiumBooking(show, date, extras) {
        return new PremiunBooking(show, date, extras);
    }

    // 클라이언트(일반예약)
    aBooking = createBooking(show, date);

    // 클라이언트(프로미엄 예약)
    aBooking = createPrimiumBooking(show, date, extras);
}

/**
 * 이제 위임 클래스를 새로 만든다.
 * 위임 클래스의 생성자는 서브클래스가 사용하던 매개변수와 예약 객체로의 역참조 back-reference를 매개변수로 받는다.
 * 역참조가 필요한 이유는 서브클래스 메서드 중 슈퍼클래스에 저장된 데이터를 사용하는 경우가 있기 때문이다.
 * 상속에서는 쉽게 처리 할 수 있지만, 위임에서는 역참조가 있어야 한다.
 */

{
    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }
    }
}

// 이제 새로운 위임을 예약 객체와 연결할 차례다.
// 프리미임 예약을 생성하는 팩터리 함수를 수정하면 된다.

{
    // 최상위
    function createPrimiumBooking(show, date, extras) {
        const result = new PremiunBooking(show, date, extras);
        result._bePremium(extras);
        return result;
    }

    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return result;
        }

        _bePremium(extras) {
            this._premiumDelegate = new PremiunBookingDelegate(this, extras);
        }
    }
}

/**
 * _bePremiun() 메서드 이름 앞에 밑줄을 붙여 이 메서드가 Booking의 공개 인터페이스가 되어서는 안 된다는 의도를 밝힌다.
 * 만약 지금 리팩터링의 목적이 일반 예약과 프리미엄 예약을 상호 변환할 수 있게 하는 것이었다면 이 메서드는 public이어도 된다.
 *
 * 구조가 갖춰졌으니 다음은 기능을 옮길 차례다.
 * 가장 먼저 고민할 부분은 hasTalkback()의 오버라이드 메서드다.
 * 현재 코드는 다음과 같다
 */

{
    class Booking {
        get hasTalkback() {
            return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }
    }

    class PremiunBooking extends Booking {
        get hasTalkback() {
            return this._show.hasOwnProperty("talkback");
        }
    }
}

// 먼저 함수 옮기기 (8.1절)를 적용해 서브클래스의 메서드를 위임으로 옮긴다.
// 새 보금자리에서도 잘 동작하도록 하기 위해 슈퍼클래스의 데이터를 사용하는 부분도 모두 _host를 통과하도록 고친다.

{
    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }

        get hasTalkback() {
            return this._host._show.hasOwnProperty("talkback");
        }
    }

    class PremiunBooking extends Booking {
        constructor(show, date, extras) {
            super(show, date);
            this._extras = extras;
        }

        get hasTalkback() {
            return this._premiumDelegate.hasTalkback;
        }

        get basePrice() {
            return Math.round(super.basePrice + this._extras.premiunFee);
        }

        get hasDinner() {
            return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
        }
    }
}

// 모든 기능이 잘 동작하는지 테스트한 후 서브클래스의 메서드를 삭제한다.

{
    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }

        get hasTalkback() {
            return this._host._show.hasOwnProperty("talkback");
        }
    }

    class PremiunBooking extends Booking {
        constructor(show, date, extras) {
            super(show, date);
            this._extras = extras;
        }

        // get hasTalkback() {
        //     return this._premiumDelegate.hasTalkback;
        // }

        get basePrice() {
            return Math.round(super.basePrice + this._extras.premiunFee);
        }

        get hasDinner() {
            return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
        }
    }
}

// 이 시점에서 나는 지금까지 무언가 실수한 게 없는지 확인하기 위해 테스트를 수행한다.
// 위임이 존재하면 위임을 사용하는 분배 로직을 슈퍼클래스 메서드에 추가하고,
// 이것을 끝으로 이번 메서드 옮기기를 마무리한다.

{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasTalkback
                : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return result;
        }

        _bePremium(extras) {
            this._premiumDelegate = new PremiunBookingDelegate(this, extras);
        }
    }
}

// 이어서 살펴볼 대상은 기본 가격이다.
{
    class Booking {
        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return result;
        }
    }

    class PremiunBooking extends Booking {
        get basePrice() {
            return Math.round(super.basePrice + this._extras.premiunFee);
        }
    }
}

/**
 * 앞서와 거의 같지만 super를 호출하는 성가신 부분에서 차이가 난다. (이런 류의 서브클래스 확장에서 흔한 사례다.)
 * 서브클래스 코드를 옮기려면 부모의 코드를 호출해야 하지만,
 * 단순히 this._host.basePrice라고 쓰면 무한 재귀에 빠지고 만다.
 *
 * 선택지가 몇 가지 있다.
 * 첫째, 슈퍼클래스의 계산 로직을 함수로 추출(6.1절)하여 가격 계산과 분배 로직을 분리하는 것이다.
 * (옮기기 작업의 나머지는 앞서와 똑같다.)
 */

{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasTalkback
                : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            return this._premiumDelegate
                ? this._premiumDelegate.basePrice
                : this._privateBasePrice;
        }

        get _privateBasePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return result;
        }

        _bePremium(extras) {
            this._premiumDelegate = new PremiunBookingDelegate(this, extras);
        }
    }

    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }

        get hasTalkback() {
            return this._host._show.hasOwnProperty("talkback");
        }

        get basePrice() {
            return Math.round(
                this._host._privateBasePrice + this._extras.premiunFee
            );
        }
    }
}

// 둘째, 위임의 메서드를 기반 메서드의 확장 형태로 재호출한다.
{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasTalkback
                : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return this._premiumDelegate
                ? this._premiumDelegate.extendBasePrice(resut)
                : result;
        }

        get _privateBasePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return result;
        }

        _bePremium(extras) {
            this._premiumDelegate = new PremiunBookingDelegate(this, extras);
        }
    }

    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }

        get hasTalkback() {
            return this._host._show.hasOwnProperty("talkback");
        }

        extendBasePrice(base) {
            return Math.round(base + this._extras.premiunFee);
        }
    }
}

// 두 선택지 모두 잘 동작하지만, 나는 살짝 더 짧다는 이유로 후자를 더 선호한다.

// 마지막으로, 서브클래스에만 존재하는 메서드도 있을 것이다.

{
    class PremiunBooking extends Booking {
        get hasDinner() {
            return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
        }
    }
}

// 이 메서드는 위임으로 옮긴다.

{
    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }

        get hasTalkback() {
            return this._host._show.hasOwnProperty("talkback");
        }

        get hasDinner() {
            return (
                this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay
            );
        }

        extendBasePrice(base) {
            return Math.round(base + this._extras.premiunFee);
        }
    }
}
// 그런 다움 Booking에 분배 로직을 추가한다.

{
    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasTalkback
                : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return this._premiumDelegate
                ? this._premiumDelegate.extendBasePrice(resut)
                : result;
        }

        get hasDinner() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasDinner
                : undefined;
        }

        _bePremium(extras) {
            this._premiumDelegate = new PremiunBookingDelegate(this, extras);
        }
    }
}

// 서브클래스의 동작을 모두 옮겼다면 팩터리 메서드가 슈퍼클래스를 반환하도록 수정한다.
// 그리고 모든 기능이 잘 동작하는지 테스트한 다음 서브클래스를 삭제한다.

{
    // 최상위
    function createPrimiumBooking(show, date, extras) {
        // const result = new PremiunBooking(show, date, extras);
        const result = new Booking(show, date, extras);
        result._bePremium(extras);
        return result;
    }

    class Booking {
        constructor(show, date) {
            this._show = show;
            this._date = date;
        }

        get hasTalkback() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasTalkback
                : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
        }

        get basePrice() {
            let result = this._show.price;
            if (this.isPeakDay) result += Math.round(result * 0.15);
            return this._premiumDelegate
                ? this._premiumDelegate.extendBasePrice(resut)
                : result;
        }

        get hasDinner() {
            return this._premiumDelegate
                ? this._premiumDelegate.hasDinner
                : undefined;
        }

        _bePremium(extras) {
            this._premiumDelegate = new PremiunBookingDelegate(this, extras);
        }
    }

    class PremiunBookingDelegate {
        constructor(hostBooking, extras) {
            this._host = hostBooking;
            this._extras = extras;
        }

        get hasTalkback() {
            return this._host._show.hasOwnProperty("talkback");
        }

        get hasDinner() {
            return (
                this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay
            );
        }

        extendBasePrice(base) {
            return Math.round(base + this._extras.premiunFee);
        }
    }

    // class PremiunBooking extends Booking {
    //     //
    // }
}

/**
 * 이 리팩터링은 그 자체만으로는 코드를 개선한다고 느껴지지 않는다.
 * 상속은 이 상황을 잘 다루고 있는 데 반해,
 * 위임을 적용하면 분배 로직과 양방향 참조가 더해지는 등 복잡도가 높아지기 때문이다.
 * 그래도 이 리팩터링이 여전히 가치 있을 수 있다.
 * 동적으로 프리미엄 예약으로 바꿀 수 있다는 장점이 생겼고, 상속은 다른 목적으로 사용할 수 있게 되었다.
 * 이 장점이 상속을 없애는 단점보다 클 수 있다.
 */
