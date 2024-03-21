/**
 * 12.10.2 서브클래스를 위임으로 바꾸기 Replace Subclass with Delegate
 * 서브클래스가 여러 개일 때
 * 앞의 예에서는 서브클래스가 하나뿐이었지만 서브클래스가 많을 때도 이번 리팩터링을 적용할 수  있다.
 */
{
    function createBird(data) {
        switch (data.type) {
            case "european swallow":
                return new EuropeanSwallow(data);
            case "africanSwallow":
                return new AfricanSwallow(data);
            case "norwegianBlueParrot":
                return new NorwegianBlueParrot(data);
            default:
                return new Bird(data);
        }
    }

    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._plumage || "normal";
        }

        get airSpeedVelocity() {
            return null;
        }
    }

    class EuropeanSwallow extends Bird {
        get airSpeedVelocity() {
            return 35;
        }
    }

    class AfricanSwallow extends Bird {
        constructor(data) {
            super(data);
            this._numberOfCoconuts = data.numberOfCoconuts;
        }

        get airSpeedVelocity() {
            return 40 - 2 * this._numberOfCoconuts;
        }
    }

    class NorwegianBlueParrot extends Bird {
        constructor(data) {
            super(data);
            this._voltage = data.voltage;
            this._isNailed = data.isNailed;
        }

        get plumage() {
            if (this._voltage > 100) return "schorched";
            else return this._plumage || "pretty";
        }

        get airSpeedVelocity() {
            return this._isNailed ? 0 : 10 + this._voltage / 10;
        }
    }
}

/**
 * 이 코드는 곧 야생 wild 조류와 사육 captivity 조류를 구분짓기 위해 크게 수정할 예정이다.
 * 이 차이를 WildBird와 CaptiveBird라는 두 서브클래스로 모델링하는 방법도 있다.
 * 하지만 상속은 한번만 쓸 수 있으니 야생과 사육을 나누려면 종에 따른 분류를 포기해야 한다.
 *
 * 이처럼 서브클래스 여러 개가 관여된 경우라면 한 번에 하나씩, 간단한 것부터 시작한다.
 * 지금 예에서는 유럽 제비 European Swallow 가 좋겠다.
 * 우선 빈 위임 클래스를 만들어보자.
 */

{
    class EuropeanSwallowDelegate {}
}

// 아직은 데이터나 역참조 매개변수를 전혀 추가하지 않았다.
// 이번 예에서는 꼭 필요할 때만 추가할 것이다.

/**
 * 위임 필드를 어디에서 초기화해야 할지를 정해야 한다.
 * 이 예에서는 생성자가 받는 유일한 인수인 data에 필요한 정보가 모두 담겨 있으므로 생성자에서 처리하도록 하자.
 * 그리고 위임을 여러 개 만들어야 하니 타입 코드를 기준으로 올바른 위임을 선택하는 메서드를 만든다.
 */

{
    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
            // add
            this._specialDelegate = this.selectSpecialDelegate(data);
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._plumage || "normal";
        }

        get airSpeedVelocity() {
            return null;
        }

        // add
        selectSpecialDelegate(data) {
            switch (data.type) {
                case "european swallow":
                    return new EuropeanSwallowDelegate(data);
                default:
                    return null;
            }
        }
    }
}

// 이제 구조가 갖춰졌으니 유럽 제비의 비행 속도 메서드를 위임으로 옮겨보자. (함수 옮기기 8.1절)

{
    class EuropeanSwallowDelegate {
        get airSpeedVelocity() {
            return 35;
        }
    }

    class EuropeanSwallow extends Bird {
        get airSpeedVelocity() {
            return this._specialDelegate.airSpeedVelocity();
        }
    }
}

// 다음으로 슈퍼클래스의 airSpeedVelocity()를 수정하여, 위임이 존재하면 메서드를 호출하도록 한다.

{
    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
            this._specialDelegate = this.selectSpecialDelegate(data);
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._plumage || "normal";
        }

        get airSpeedVelocity() {
            // return null;
            return this._specialDelegate
                ? this._specialDelegate.airSpeedVelocity
                : null;
        }

        selectSpecialDelegate(data) {
            switch (data.type) {
                case "european swallow":
                    return new EuropeanSwallowDelegate(data);
                default:
                    return null;
            }
        }
    }
}

// 그리고 유럽 제비 서브클래스를 제거한다.
// class EuropeanSwallow extends Bird {
//     get airSpeedVelocity() {
//         return this._specialDelegate.airSpeedVelocity();
//     }
// }

{
    // 최상위
    function createBird(data) {
        switch (data.type) {
            // case "european swallow":
            //     return new EuropeanSwallow(data);
            case "africanSwallow":
                return new AfricanSwallow(data);
            case "norwegianBlueParrot":
                return new NorwegianBlueParrot(data);
            default:
                return new Bird(data);
        }
    }
}

// 다음은 African Swallow 차례다.
// 역시 위임 클래스를 만드는데, 이번에서는 생성자에서 데이터를 받도록 한다.

{
    class AfricanSwallowDelegate {
        constructor(data) {
            super(data);
            this._numberOfCoconuts = data.numberOfCoconuts;
        }
    }

    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
            this._specialDelegate = this.selectSpecialDelegate(data);
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._plumage || "normal";
        }

        get airSpeedVelocity() {
            return this._specialDelegate
                ? this._specialDelegate.airSpeedVelocity
                : null;
        }

        selectSpecialDelegate(data) {
            switch (data.type) {
                case "european swallow":
                    return new EuropeanSwallowDelegate(data);
                // add
                case "africanSwallow":
                    return new AfricanSwallowDelegate(data);
                default:
                    return null;
            }
        }
    }
}

// 역시airSpeedVelocity() 함수를 옮긴다.

{
    class AfricanSwallowDelegate {
        constructor(data) {
            super(data);
            this._numberOfCoconuts = data.numberOfCoconuts;
        }

        get airSpeedVelocity() {
            return 40 - 2 * this._numberOfCoconuts;
        }
    }

    class AfricanSwallow extends Bird {
        constructor(data) {
            super(data);
            this._numberOfCoconuts = data.numberOfCoconuts;
        }

        get airSpeedVelocity() {
            return this._specialDelegate.airSpeedVelocity;
        }
    }
}

// 이제 아프리카 제비 서브클래스를 제거한다.

{
    // class AfricanSwallow extends Bird {
    //     constructor(data) {
    //         super(data);
    //         this._numberOfCoconuts = data.numberOfCoconuts;
    //     }
    //     get airSpeedVelocity() {
    //         return 40 - 2 * this._numberOfCoconuts;
    //     }
    // }

    function createBird(data) {
        switch (data.type) {
            // case "africanSwallow":
            //     return new AfricanSwallow(data);
            case "norwegianBlueParrot":
                return new NorwegianBlueParrot(data);
            default:
                return new Bird(data);
        }
    }
}

// 이번엔 Norwegian Blue Parrot 차례다.
// 똑같은 순서로 위임 클래스를 만들고
// 비행 속도 함수를 옮긴다.
// 결과는 다음과 같다.

{
    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
            this._specialDelegate = this.selectSpecialDelegate(data);
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._plumage || "normal";
        }

        get airSpeedVelocity() {
            return this._specialDelegate
                ? this._specialDelegate.airSpeedVelocity
                : null;
        }

        selectSpecialDelegate(data) {
            switch (data.type) {
                case "european swallow":
                    return new EuropeanSwallowDelegate(data);
                case "africanSwallow":
                    return new AfricanSwallowDelegate(data);
                case "norwegianBlueParrot":
                    return new NorwegianBlueParrotDelegate(data);
                default:
                    return null;
            }
        }
    }

    class NorwegianBlueParrotDelegate {
        constructor(data) {
            super(data);
            this._voltage = data.voltage;
            this._isNailed = data.isNailed;
        }

        get airSpeedVelocity() {
            return this._isNailed ? 0 : 10 + this._voltage / 10;
        }
    }
}

/**
 * 모두 잘 된 듯 보이지만 다른 서브클래스 때는 다루지 않은 부분이 보인다.
 * 바로 노르웨이 파랑 앵무는 깃털 상태, 즉 plumage()를 오버라이드 한다는 점이다.
 * 이 메서드를 옮기는 작업의 초반은 여전히 간단하다.
 * 생성자에 Bird로의 역참조를 추가해야 한다는 점 정도만 다르다.
 */

{
    class NorwegianBlueParrot extends Bird {
        constructor(data) {
            super(data);
            this._voltage = data.voltage;
            this._isNailed = data.isNailed;
        }

        get plumage() {
            this._specialDelegate.plumage; //
        }

        get airSpeedVelocity() {
            return this._isNailed ? 0 : 10 + this._voltage / 10;
        }
    }

    class NorwegianBlueParrotDelegate {
        constructor(data, bird) {
            this._bird = bird;
            this._voltage = data.voltage;
            this._isNailed = data.isNailed;
        }

        //
        get plumage() {
            if (this._voltage > 100) return "schorched";
            else return this._bird._plumage || "pretty"; //
        }

        get airSpeedVelocity() {
            return this._isNailed ? 0 : 10 + this._voltage / 10;
        }
    }

    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
            this._specialDelegate = this.selectSpecialDelegate(data);
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._plumage || "normal";
        }

        get airSpeedVelocity() {
            return this._specialDelegate
                ? this._specialDelegate.airSpeedVelocity
                : null;
        }

        selectSpecialDelegate(data) {
            switch (data.type) {
                case "european swallow":
                    return new EuropeanSwallowDelegate(data);
                case "africanSwallow":
                    return new AfricanSwallowDelegate(data);
                case "norwegianBlueParrot":
                    return new NorwegianBlueParrotDelegate(data, this); //
                default:
                    return null;
            }
        }
    }
}

// 까다로운 단계는 서브클래스에서 plumage() 메서드를 어떻게 제거하느냐다.
// 다음처럼 시도하면 다른 종의 위임에서는 이 속성이 없기 때문에 다수의 오류가 발생할 것이다.

{
    class Bird {
        get plumage() {
            if (this._specialDelegate) return this._specialDelegate.plumage;
            else return this._plumage || "normal";
        }
    }
}

// 다음처럼 조건을 더 정교하게 검사하는 방법도 있다.

{
    class Bird {
        get plumage() {
            if (this._specialDelegate instanceof NorwegianBlueParrot)
                return this._specialDelegate.plumage;
            else return this._plumage || "normal";
        }
    }
}

// 여러분도 이 코드에서 악취를 맡았기를 바란다.
// 이처럼 클래스 종류를 꼭 집이서 검사하는 것은 절대 좋은 생각이 아니다.

// 또 다른 선택자로, 기본값을 두고 노르웨이 파랑 앵무만 특별히 취급하는 방식도 있다.
{
    class Bird {
        get plumage() {
            if (this._specialDelegate) return this._specialDelegate.plumage;
            else return this._plumage || "normal";
        }
    }

    class EuropeanSwallowDelegate {
        get plumage() {
            return this._plumage || "normal";
        }
    }

    class AfricanSwallowDelegate {
        get plumage() {
            return this._plumage || "normal";
        }
    }
}

/**
 * 하지만 plumage()의 기본 메서드가 여러 클래스에 중복되어 들어가는 결과를 낳는다.
 * 여기에 더해서 몇몇 생성자에서 역참조를 대입하는 코드 역시 중복될 수 있다.
 *
 * 이 중복을 해결하는 자연스러운 방법은 바로 '상속'이다.
 * 지금까지 만든 종 분류용 위임들에서 슈퍼클래스를 추출(12.8절)해보자.
 */

{
    class SpecialDelegate {
        constructor(data, bird) {
            this._bird = bird;
        }

        get plumage() {
            return this._bird._plumage || "normal";
        }

        // ...
    }

    class EuropeanSwallowDelegate extends SpecialDelegate {
        // ...
    }

    class AfricanSwallowDelegate extends SpecialDelegate {
        constructor(data, bird) {
            super(data, bird);
            this._numberOfCoconuts = data.numberOfCoconuts;
        }
    }

    class NorwegianBlueParrotDelegate extends SpecialDelegate {
        constructor(data, bird) {
            super(data, bird);
            this._voltage = data.voltage;
            this._isNailed = data.isNailed;
        }
    }
}

/**
 * 슈퍼블래스가 생겼으니 Bird의 기본 동작 모두를 SpecialDelegetㄷ 클래스로 옮길 수 있다.
 * 그리고 specialDelegate 필드에는 언네나 값이 들어 있음이 보장된다.
 */

{
    class Bird {
        constructor(data) {
            this._name = data.name;
            this._plumage = data.plumage;
            this._specialDelegate = this.selectSpecialDelegate(data);
        }

        get name() {
            return this._name;
        }

        get plumage() {
            return this._specialDelegate._plumage || "normal";
        }

        get airSpeedVelocity() {
            return this._specialDelegate.airSpeedVelocity;
        }

        selectSpecialDelegate(data) {
            switch (data.type) {
                case "european swallow":
                    return new EuropeanSwallowDelegate(data, this); //
                case "africanSwallow":
                    return new AfricanSwallowDelegate(data, this); //
                case "norwegianBlueParrot":
                    return new NorwegianBlueParrotDelegate(data, this);
                default:
                    return new SpecialDelegate(data, this); //
            }
        }
    }

    class SpecialDelegate {
        constructor(data, bird) {
            this._bird = bird;
        }

        get plumage() {
            return this._bird._plumage || "normal";
        }

        get airSpeedVelocity() {
            return null;
        }
    }
}

/**
 * Bird의 위임 메서드가 간결해지기 때문에 나는 이 방식을 좋아한다.
 * 이 방식에서는 어떤 동작이 SpecialDelegate로 위임되었고 무엇이 남겨졌는지를 쉽게 확인할 수 있다.
 *
 * 다음은 이 클래스들의 최종 모습이다.
 */

function createBird(data) {
    return new Brid(data);
}

class Bird {
    constructor(data) {
        this._name = data.name;
        this._plumage = data.plumage;
        this._specialDelegate = this.selectSpecialDelegate(data);
    }

    get name() {
        return this._name;
    }

    get plumage() {
        return this._specialDelegate._plumage;
    }

    get airSpeedVelocity() {
        return this._specialDelegate.airSpeedVelocity;
    }

    selectSpecialDelegate(data) {
        switch (data.type) {
            case "european swallow":
                return new EuropeanSwallowDelegate(data, this);
            case "africanSwallow":
                return new AfricanSwallowDelegate(data, this);
            case "norwegianBlueParrot":
                return new NorwegianBlueParrotDelegate(data, this);
            default:
                return new SpecialDelegate(data, this);
        }
    }
}

class SpecialDelegate {
    constructor(data, bird) {
        this._bird = bird;
    }

    get plumage() {
        return this._bird._plumage || "normal";
    }

    get airSpeedVelocity() {
        return null;
    }
}

class EuropeanSwallowDelegate extends SpecialDelegate {
    get airSpeedVelocity() {
        return 35;
    }
}

class AfricanSwallowDelegate extends SpecialDelegate {
    constructor(data, bird) {
        super(data, bird);
        this._numberOfCoconuts = data.numberOfCoconuts;
    }

    get airSpeedVelocity() {
        return 40 - 2 * this._numberOfCoconuts;
    }
}

class NorwegianBlueParrotDelegate extends SpecialDelegate {
    constructor(data, bird) {
        super(data, bird);
        this._voltage = data.voltage;
        this._isNailed = data.isNailed;
    }

    get airSpeedVelocity() {
        return this._isNailed ? 0 : 10 + this._voltage / 10;
    }

    get plumage() {
        if (this._voltage > 100) return "schorched";
        else return this._bird._plumage || "pretty";
    }
}

/**
 * 이 예시는 원래의 서브클래스들을 위임으로 교체했지만 SpecialDelegate에는 여전히 처음 구조와 매우 비슷한 게층구조가 존재한다.
 * Bird를 상속으로부터 구제한 것 외에 이 리팩터링에서 얻은 건 무엇일까?
 * 위임으로 옮겨진 종 계층구조는 더 엄격하게 종과 관련한 내용만을 다루게 되었다.
 * 다시 말해, 위임 클래스들은 종에 따라 달라지는 데이터와 메서드만을 담게 되고 종과 상관없는 공통 코드는 Bird 자체와 미래의 서브클래스들에 남는다.
 *
 * 위임에서 슈퍼클래스를 추출해 상속구조로 만드는 방식의 앞서의 예약 예시에도 적용할 수 있었다.
 * 그렇게 했다면 분배 로직을 처리하는 Booking의 메서드들을 위임을 호출하는 간단한 코드로 대체할 수 있다(분배는 상속으로 처리한다).
 */
