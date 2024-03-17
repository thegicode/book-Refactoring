/**
## 12.6 타입 코드를 서브클래스로 바꾸기 Replace Type Code with Subclasses
 * 직접 상속할 때
 * 직원 코드
 */

{
    class Employee {
        constructor(name, type) {
            this.validateType(type);
            this._name = name;
            this._type = type;
        }

        validateType(arg) {
            if (!["engineer", "manager", "salesperson"].includes(arg))
                throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        }

        toString() {
            return `${this._name} ${this._type}`;
        }
    }
}

/**
 * 첫 번째로, 타입 코드 변수를 자가 캡술화(6.6절) 한다.
 */

{
    class Employee {
        constructor(name, type) {
            this.validateType(type);
            this._name = name;
            this._type = type;
        }

        get type() {
            return this._type;
        }

        validateType(arg) {
            if (!["engineer", "manager", "salesperson"].includes(arg))
                throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        }

        toString() {
            return `${this._name} ${this.type}`;
        }
    }
}
// toString()에서 타입 코드를 가져올 때 방금 만든 게터를 사용했음에 주의하자. (밑줄이 없어졌다)

/**
 * 타입 코드 중 한, 여기서는 엔지니어 engineer 를 선택해보자.
 * 이번에는 직접 상속 방식으로 구현할 것이다.
 * 즉, 직원 클래스 자체를 서브클래싱한다.
 * 타입 코드 게터를 오버라이드하여 적절한 리터럴 값을 반환하기만 하면 되므로 아주 간단하게 처리할 수 있다.
 */

{
    class Engineer extends Employee {
        get type() {
            return "engineer";
        }
    }
}

/**
 *  자바스크립트의 생성자는 객체를 반환할 수 있지만 선택 로직을 생성자에 넣으려 하면 초기화와 로직이 꼬여서 엉망이 될 것이다.
 *  그러니 생성자를 팩터리 함수(11.8절)로 바꿔서 선택로직을 담을 별도 장소를 마련한다.
 */

{
    function createEmployee(name, type) {
        return new Employee(name, type);
    }
}
// 새로 만든 서브클래스를 사용하기 위한 선택 로직을 팩터리에 추가한다.

{
    function createEmployee(name, type) {
        switch (type) {
            case "engineer":
                return new Engineer(name, type);
        }
        return new Employee(name, type);
    }
}
/**
 * 지금까지 수정한 것이 제대로 동작하는지 테스트한다.
 * 그런데 난 편집증이 있어서, 엔지니어 클래스에서 오버라이드한 게터가 일부러 엉뚱한 값을 반환하게 한 다음 다시 테스트해봣다.
 * 그러면 당연히 실패하는데, 이런 식으로 이 서브클래스가 실제로 사용됐음을 확인할 수 있다!
 * 반환 값을 정상으로 돌리고 남은 유형들에도 같은 작업을 반복한다.
 * 한 번에 한 유형씩 수정하고, 수정 후에는 테스트한다.
 */

{
    class Salesperson extends Employee {
        get type() {
            return "salesperson";
        }
    }

    class Manager extends Employee {
        get type() {
            return "manager";
        }
    }

    function createEmployee(name, type) {
        switch (type) {
            case "engineer":
                return new Engineer(name, type);
            case "salesperson":
                return new Salesperson(name, type);
            case "manager":
                return new Manager(name, type);
        }
        return new Employee(name, type);
    }
}

/**
 * 모든 유형에 적용했다면 타입 코드 필드와 슈퍼클래스의 게터(서브클래스들에서 재정의한 메서드)를 제거한다.
 */
{
    class Employee {
        constructor(name, type) {
            this.validateType(type);
            this._name = name;
            // this._type = type;
        }

        // get type() {
        //     return this._type;
        // }

        validateType(arg) {
            if (!["engineer", "manager", "salesperson"].includes(arg))
                throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        }

        toString() {
            return `${this._name} ${this.type}`;
        }
    }
}

/**
 * 모든 게 정상인지 테스트한 후 검증 로직도 제거한다.
 * switch문이 사실상 똑같은 검증을 수행해주기 때문이다.
 */

{
    class Employee {
        constructor(name, type) {
            // this.validateType(type);
            this._name = name;
        }

        // validateType(arg) {
        //     if (!["engineer", "manager", "salesperson"].includes(arg))
        //         throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        // }

        toString() {
            return `${this._name} ${this.type}`;
        }
    }

    function createEmployee(name, type) {
        switch (type) {
            case "engineer":
                return new Engineer(name, type);
            case "salesperson":
                return new Salesperson(name, type);
            case "manager":
                return new Manager(name, type);
            default:
                throw new Error(`${type}라는 직원 유형은 없습니다.`);
        }
        // return new Employee(name, type);
    }
}

// 이제 생성자에 건네는 타입 코드 인수는 쓰이지 않으니 없애버린다.(함수 선언 바꾸기 6.5절)

{
    class Employee {
        constructor(name) {
            this._name = name;
        }

        toString() {
            return `${this._name} ${this.type}`;
        }
    }

    function createEmployee(name, type) {
        switch (type) {
            case "engineer":
                return new Engineer(name);
            case "salesperson":
                return new Salesperson(name);
            case "manager":
                return new Manager(name);
            default:
                throw new Error(`${type}라는 직원 유형은 없습니다.`);
        }
    }
}

// 최종 코드

class Employee {
    constructor(name) {
        this._name = name;
    }

    toString() {
        return `${this._name} ${this.type}`;
    }
}

class Engineer extends Employee {
    get type() {
        return "engineer";
    }
}

class Salesperson extends Employee {
    get type() {
        return "salesperson";
    }
}

class Manager extends Employee {
    get type() {
        return "manager";
    }
}

function createEmployee(name, type) {
    switch (type) {
        case "engineer":
            return new Engineer(name);
        case "salesperson":
            return new Salesperson(name);
        case "manager":
            return new Manager(name);
        default:
            throw new Error(`${type}라는 직원 유형은 없습니다.`);
    }
}

/**
 * 서브클래스들에는 타입 코드 게터(get type())가 여전히 남아 있다.
 * 보통은 이 게터들을 제거하고 싶겠지만, 이 메서드를 이용하는 코드가 어딘가에 남아 있을 수 있다.
 * 그러니 조건부로직을 다형성으로 바꾸기(10.4절)와 메서드 내리기(12.4절)로 문제를 해결하자.
 * 하나씩 해결하다 보면 타입 게터를 호출하는 코드가 모두 사라질 것이다.
 * 그러니 마음 편히 작별을 고하게 된다. (죽은 코드 제거하기 8.9절)
 */
