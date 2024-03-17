/**
## 12.6.2 타입 코드를 서브클래스로 바꾸기 Replace Type Code with Subclasses
 * 간접 상속할 때
 * 처음 상황으로 돌아가보자. 
 * 하지만 이번에는 직원의 서브클래스로 '아르바이트'와 '정직원'이라는 클래스가 이미 있어서
 * Employee를 직접 상속하는 방식으로는 타입 코드 문제에 대처할 수 없다고 해보자. 
 * 직원 유형을 변경하는 기능을 유지하고 싶다는 점도 직접 상속을 사용하지 않는 이유다.
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

        get type() {
            return this._type;
        }

        set type(arg) {
            this._type = arg;
        }

        get capitalizedType() {
            return (
                this._type.charAt(0).toUpperCase() +
                this._type.substr(1).toLowerCase()
            );
        }

        toString() {
            return `${this._name} ${this.capitalizedType}`;
        }
    }
}

// 이번에는 이 예시 마지막에서 설명할 내용을 위해 toString()이 살짝 복잡해졌다.

/**
 * 첫 번째로 할 일은 타입 코드를 객체로 바꾸기다(기본형을 객체로 바꾸기 7.3절)
 */

{
    class EmployeeType {
        constructor(aString) {
            this._value = aString;
        }
        toString() {
            return this._value;
        }
    }

    class Employee {
        constructor(name, type) {
            this.validateType(type);
            this._name = name;
            this.type = type;
        }

        validateType(arg) {
            if (!["engineer", "manager", "salesperson"].includes(arg))
                throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        }

        // add
        get typeString() {
            return this._type.toString();
        }

        get type() {
            return this._type;
        }

        // apply EmployeeType
        set type(arg) {
            this._type = new EmployeeType(arg);
        }

        // this._type => this.typeString
        get capitalizedType() {
            return (
                this.typeString.charAt(0).toUpperCase() +
                this.typeString.substr(1).toLowerCase()
            );
        }

        toString() {
            return `${this._name} ${this.capitalizedType}`;
        }
    }
}

// 이제 바로 앞 예시와 같은 방식으로 직원 유형을 차분히 리팩터링해보자.
{
    class Employee {
        constructor(name, type) {
            this.validateType(type);
            this._name = name;
            this.type = type;
        }

        validateType(arg) {
            if (!["engineer", "manager", "salesperson"].includes(arg))
                throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        }

        get typeString() {
            return this._type.toString();
        }

        get type() {
            return this._type;
        }

        set type(arg) {
            // this._type = new EmployeeType(arg);
            this._type = Employee.createEmployeeType(arg);
        }

        get capitalizedType() {
            return (
                this.typeString.charAt(0).toUpperCase() +
                this.typeString.substr(1).toLowerCase()
            );
        }

        toString() {
            return `${this._name} ${this.capitalizedType}`;
        }

        // add
        static createEmployeeType(aString) {
            switch (aString) {
                case "engineer":
                    return new Engineer();
                case "manager":
                    return new Manager();
                case "salesperson":
                    return new Salesperson();
                default:
                    throw new Error(`${aString}이라는 직원 유형은 없습니다.`);
            }
        }
    }

    class EmployeeType {
        // constructor(aString) {
        //     this._value = aString;
        // }
        // toString() {
        //     return this._value;
        // }
    }

    class Engineer extends EmployeeType {
        toString() {
            return "engineer";
        }
    }

    class Manager extends EmployeeType {
        toString() {
            return "manager";
        }
    }

    class Salesperson extends EmployeeType {
        toString() {
            return "salesperson";
        }
    }
}

/**
 * 이 코드에서 빈 EmployeeType을 제거할 수도 있었다.
 * 하지만 나는 이번 예처럼 다양한 서브클래스 사이의 관계를 명확히 알려주는 클래스라면 그냥 두는 편이다.
 * 또한 이 클래스는 다른 기능을 옮겨놓기에 편리한 장소이기도 하다.
 * 예컨대 이 예에서는 이름의 첫 문자만 대문자로 변환해주는 로직을 이 클래스로 옮길 수 있을 것이다.
 */
{
    class Employee {
        constructor(name, type) {
            this.validateType(type);
            this._name = name;
            this.type = type;
        }

        validateType(arg) {
            if (!["engineer", "manager", "salesperson"].includes(arg))
                throw new Error(`${arg}라는 직원 유형은 없습니다.`);
        }

        get typeString() {
            return this._type.toString();
        }

        get type() {
            return this._type;
        }

        set type(arg) {
            this._type = Employee.createEmployeeType(arg);
        }

        get capitalizedType() {
            return (
                this.typeString.charAt(0).toUpperCase() +
                this.typeString.substr(1).toLowerCase()
            );
        }

        toString() {
            // return `${this._name} ${this.capitalizedType}`;
            return `${this._name} ${this._type.calitalizeName}`;
        }

        static createEmployeeType(aString) {
            switch (aString) {
                case "engineer":
                    return new Engineer();
                case "manager":
                    return new Manager();
                case "salesperson":
                    return new Salesperson();
                default:
                    throw new Error(`${aString}이라는 직원 유형은 없습니다.`);
            }
        }
    }

    class EmployeeType {
        get calitalizeName() {
            return (
                this.toString().charAt(0).toUpperCase() +
                this.toString().substr(1).toLowerCase()
            );
        }
    }
}

/**
 * 이 책의 초판을 기억하는 독자는 이 예시가 '분류 부호를 상태/전략 패턴으로 전환 Replace Type Code with State/Startegy'의 예시와 본질적으로 같다는 사실을 눈치챘을 것이다.
 * 이번 리팩터링을 간접 상속에 적용하면 결국 '분류 부호를 상태/전략 패턴으로 전환'과 같아지기 때문에 둘을 하나로 통합한 결과다(이름도 마음에 들지 않았고 말이다).
 */

// 최종코드

class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
        this.type = type;
    }

    validateType(arg) {
        if (!["engineer", "manager", "salesperson"].includes(arg))
            throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }

    get type() {
        return this._type;
    }

    set type(arg) {
        this._type = Employee.createEmployeeType(arg);
    }

    toString() {
        return `${this._name} ${this._type.calitalizeName}`;
    }

    static createEmployeeType(aString) {
        switch (aString) {
            case "engineer":
                return new Engineer();
            case "manager":
                return new Manager();
            case "salesperson":
                return new Salesperson();
            default:
                throw new Error(`${aString}이라는 직원 유형은 없습니다.`);
        }
    }
}

class EmployeeType {
    get calitalizeName() {
        return (
            this.toString().charAt(0).toUpperCase() +
            this.toString().substr(1).toLowerCase()
        );
    }
}

class Engineer extends EmployeeType {
    toString() {
        return "engineer";
    }
}

class Manager extends EmployeeType {
    toString() {
        return "manager";
    }
}

class Salesperson extends EmployeeType {
    toString() {
        return "salesperson";
    }
}
