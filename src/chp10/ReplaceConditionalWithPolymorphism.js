// 10.4.1 조건부 로직을 다형성으로 바꾸기 Replace Conditional with Polymorphism

// 다양한 새를 키우는 친구가 있는데, 새의 종에 따른 비행 속도와 깃털 상태를 알고 싶어한다.

// plumage : 깃털
// velocity : 속도
{
    function plumages(birds) {
        return new Map(birds.map((b) => [b.name, plumage(b)]));
    }

    function speeds(birds) {
        return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
    }

    // 깃털 상태
    function plumage(bird) {
        switch (bird.type) {
            case "EuropeanSwallow":
                return "average";
            case "AfricanSwallow":
                return bird.numberOfCoconuts > 2 ? "tired" : "average";
            case "NorwegianBlueParrot":
                return bird.voltage > 100 ? "scorched" : "beautiful";
            default:
                return "unknown";
        }
    }

    // 비행 속도
    function airSpeedVelocity(bird) {
        switch (bird.type) {
            case "EuropeanSwallow":
                return 35;
            case "AfricanSwallow":
                return 40 - 2 * bird.numberOfCoconuts;
            case "NorwegianBlueParrot":
                return bird.isNailed ? 0 : 10 + bird.voltage / 10;
            default:
                return null;
        }
    }
}

// 1
// 새 종류에 따라 다르게 동작하는 함수가 몇 개 보이니 종류별 클래스를 만들어서 각각에 맞는 동작을 표현하면 좋을 것 같다.
// 가장 먼저 airSpeedVelocity()와 plumage()를 Bird라는 클래스로 묶어보자.
{
    function plumages(birds) {
        return new Map(birds.map((b) => [b.name, plumage(b)]));
    }

    function speeds(birds) {
        return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
    }

    // 깃털 상태
    function plumage(bird) {
        return new Bird(bird).plumage;
    }

    // 비행 속도
    function airSpeedVelocity(bird) {
        return new Bird(bird).airSpeedVelocity;
    }

    class Bird {
        constructor(birdObject) {
            Object.assign(this, birdObject);
        }

        get plumage() {
            switch (this.type) {
                case "EuropeanSwallow":
                    return "average";
                case "AfricanSwallow":
                    return this.numberOfCoconuts > 2 ? "tired" : "average";
                case "NorwegianBlueParrot":
                    return this.voltage > 100 ? "scorched" : "beautiful";
                default:
                    return "unknown";
            }
        }

        get airSpeedVelocity() {
            switch (this.type) {
                case "EuropeanSwallow":
                    return 35;
                case "AfricanSwallow":
                    return 40 - 2 * this.numberOfCoconuts;
                case "NorwegianBlueParrot":
                    return this.isNailed ? 0 : 10 + this.voltage / 10;
                default:
                    return null;
            }
        }
    }
}

// 2
// 이제 종별 서브클래스를 만든다. 적합한 서브클래스의 인스턴스를 만둘어줄 팩터리 함수도 잊지 말자.
// 그리고 나서 객체를 얻을 때 팩터리 함수를 사용하도록 수정한다.

{
    function plumages(birds) {
        return new Map(birds.map((b) => [b.name, plumage(b)]));
    }

    function speeds(birds) {
        return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
    }

    // 깃털 상태
    function plumage(bird) {
        return createBird(bird).plumage;
    }

    // 비행 속도
    function airSpeedVelocity(bird) {
        return createBird(bird).airSpeedVelocity;
    }

    function createBird(bird) {
        switch (bird.type) {
            case "EuropeanSwallow":
                return new EuropeanSwallow(bird);
            case "AfricanSwallow":
                return new AfricanSwallow(bird);
            case "NorwegianBlueParrot":
                return new NorwegianBlueParrot(bird);
            default:
                return new Bird(bird);
        }
    }

    class Bird {
        constructor(birdObject) {
            Object.assign(this, birdObject);
        }

        get plumage() {
            switch (this.type) {
                case "EuropeanSwallow":
                    return "average";
                case "AfricanSwallow":
                    return this.numberOfCoconuts > 2 ? "tired" : "average";
                case "NorwegianBlueParrot":
                    return this.voltage > 100 ? "scorched" : "beautiful";
                default:
                    return "unknown";
            }
        }

        get airSpeedVelocity() {
            switch (this.type) {
                case "EuropeanSwallow":
                    return 35;
                case "AfricanSwallow":
                    return 40 - 2 * this.numberOfCoconuts;
                case "NorwegianBlueParrot":
                    return this.isNailed ? 0 : 10 + this.voltage / 10;
                default:
                    return null;
            }
        }
    }

    class EuropeanSwallow extends Bird {}
    class AfricanSwallow extends Bird {}
    class NorwegianBlueParrot extends Bird {}
}

// 3
// 필요한 클래스 구조가 준비되었으니 두 조건부 메서드를 처리할 차례다.
// plumage()부터 시작하자.
// switch문의 절 하나를 선택해 해당 서브클래스에서 오버라이드한다. 첫 번째 절의 유럽 제비를 선택해봤다.
{
    function plumages(birds) {
        return new Map(birds.map((b) => [b.name, plumage(b)]));
    }

    function speeds(birds) {
        return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
    }

    // 깃털 상태
    function plumage(bird) {
        return createBird(bird).plumage;
    }

    // 비행 속도
    function airSpeedVelocity(bird) {
        return createBird(bird).airSpeedVelocity;
    }

    function createBird(bird) {
        switch (bird.type) {
            case "EuropeanSwallow":
                return new EuropeanSwallow(bird);
            case "AfricanSwallow":
                return new AfricanSwallow(bird);
            case "NorwegianBlueParrot":
                return new NorwegianBlueParrot(bird);
            default:
                return new Bird(bird);
        }
    }

    class Bird {
        constructor(birdObject) {
            Object.assign(this, birdObject);
        }

        get plumage() {
            switch (this.type) {
                case "EuropeanSwallow":
                    throw "error";
                case "AfricanSwallow":
                    return this.numberOfCoconuts > 2 ? "tired" : "average";
                case "NorwegianBlueParrot":
                    return this.voltage > 100 ? "scorched" : "beautiful";
                default:
                    return "unknown";
            }
        }

        get airSpeedVelocity() {
            switch (this.type) {
                case "EuropeanSwallow":
                    return 35;
                case "AfricanSwallow":
                    return 40 - 2 * this.numberOfCoconuts;
                case "NorwegianBlueParrot":
                    return this.isNailed ? 0 : 10 + this.voltage / 10;
                default:
                    return null;
            }
        }
    }

    class EuropeanSwallow extends Bird {
        get plumage() {
            return "average";
        }
    }
    class AfricanSwallow extends Bird {}
    class NorwegianBlueParrot extends Bird {}
}

// 4
// 나는 완벽주의자이니 슈퍼클래스의 조건문에 throw를 추가했다.
// 이 시점에서 컴파일하고 테스트해보자. 잘 동작한다면 다음 조건절을 처리한다.
{
    function plumages(birds) {
        return new Map(birds.map((b) => [b.name, plumage(b)]));
    }

    function speeds(birds) {
        return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
    }

    // 깃털 상태
    function plumage(bird) {
        return createBird(bird).plumage;
    }

    // 비행 속도
    function airSpeedVelocity(bird) {
        return createBird(bird).airSpeedVelocity;
    }

    function createBird(bird) {
        switch (bird.type) {
            case "EuropeanSwallow":
                return new EuropeanSwallow(bird);
            case "AfricanSwallow":
                return new AfricanSwallow(bird);
            case "NorwegianBlueParrot":
                return new NorwegianBlueParrot(bird);
            default:
                return new Bird(bird);
        }
    }

    class Bird {
        constructor(birdObject) {
            Object.assign(this, birdObject);
        }

        get plumage() {
            return "unknown";
        }

        get airSpeedVelocity() {
            switch (this.type) {
                case "EuropeanSwallow":
                    return 35;
                case "AfricanSwallow":
                    return 40 - 2 * this.numberOfCoconuts;
                case "NorwegianBlueParrot":
                    return this.isNailed ? 0 : 10 + this.voltage / 10;
                default:
                    return null;
            }
        }
    }

    class EuropeanSwallow extends Bird {
        get plumage() {
            return "average";
        }
    }
    class AfricanSwallow extends Bird {
        get plumage() {
            return this.numberOfCoconuts > 2 ? "tired" : "average";
        }
    }
    class NorwegianBlueParrot extends Bird {
        get plumage() {
            return this.voltage > 100 ? "scorched" : "beautiful";
        }
    }
}

// 5
// 똑같은 과정을 airSpeedVelocity()에도 수행한다. 다 끝내면 코드의 모습이 다음처럼 변해 있을 것이다.
// (참고로 최상위 함수인 airSpeedVelocity()와 plumage()는 인라인시켰다 )

export function plumages(birds) {
    return new Map(
        birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.plumage])
    );
}

export function speeds(birds) {
    return new Map(
        birds
            .map((b) => createBird(b))
            .map((bird) => [bird.name, bird.airSpeedVelocity])
    );
}

function createBird(bird) {
    switch (bird.type) {
        case "EuropeanSwallow":
            return new EuropeanSwallow(bird);
        case "AfricanSwallow":
            return new AfricanSwallow(bird);
        case "NorwegianBlueParrot":
            return new NorwegianBlueParrot(bird);
        default:
            return new Bird(bird);
    }
}

class Bird {
    constructor(birdObject) {
        Object.assign(this, birdObject);
    }

    get plumage() {
        return "unknown";
    }

    get airSpeedVelocity() {
        return null;
    }
}

class EuropeanSwallow extends Bird {
    get plumage() {
        return "average";
    }

    get airSpeedVelocity() {
        return 35;
    }
}

class AfricanSwallow extends Bird {
    get plumage() {
        return this.numberOfCoconuts > 2 ? "tired" : "average";
    }

    get airSpeedVelocity() {
        return 40 - 2 * this.numberOfCoconuts;
    }
}

class NorwegianBlueParrot extends Bird {
    get plumage() {
        return this.voltage > 100 ? "scorched" : "beautiful";
    }

    get airSpeedVelocity() {
        return this.isNailed ? 0 : 10 + this.voltage / 10;
    }
}

// 최종 코드를 보니 슈퍼클래스인 Bird는 없어도 괜찮아 보인다.
// 자바스크립트에서는 타입 계층 구조 없이도 다형성을 표현할 수 있다.
// 객체가 적절한 이름의 메서드만 구현하고 있다면 아무 문제없이 같은 타입으로 취급하기 때문이다. (duc typing)
// 하지만 이번 예에서는 슈퍼클래스가 클래스들의 관계를 잘 설명해주기 때문에 그대로 두기로 했다.
