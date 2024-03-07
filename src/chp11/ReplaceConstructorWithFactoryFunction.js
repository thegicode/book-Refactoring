/**
 * 11.8 생성자를 팩터리 함수로 바꾸기 Replace Constructor with Factory Function
 * 직원 employee 유형을 다루는, 간단하지만 이상한 예
 */

{
    // 직원 클래스
    class Employee {
        constructor(name, typeCode) {
            this._name = name;
            this._typeCode = typeCode;
        }

        get name() {
            return this._name;
        }

        get type() {
            return Employee.legalTypeCodes[this._typeCode];
        }

        static get legalTypeCodes() {
            return { E: "Engineer", M: "Manaber", S: "Salesperson" };
        }
    }

    // 이 클래스를 사용하는 코드
    // const candidate = new Employee(document.name, document.empType);

    // 다음처럼도 사용한다.
    // const leadEngineer = new Employee(document.leadEngineer, "E");
}

/* 1. 첫 번째로 할 일은 팩터리 함수 만들기
    팩터리 본문은 단순히 생성자에 위임하는 방식으로 구현한다.
 */
{
    function createEmployee(name, typeCode) {
        return new Employee(name, typeCode);
    }
}

/* 2. 생성자를 호출하는 곳을 찾아 수정한다. 
    한 번에 하나씩, 생성자 대신 팩터리 함수를 사용하기 바꾼다. 
 */
{
    // 첫 번째 코드는 쉽게 바꿀 수 있다.
    // const candidate = createEmployee(document.name, document.empType);
    // 두 번째 코드를 바꾸려면 다음과 같은 모습의 새로운 팩터리 함수를 사용할 수도 있을 것이다.
    // const leadEngineer = createEmployee(document.leadEngineer, "E");
}

// 하지만 이건 권장하는 코드 스타일이 아니다. (함수에 문자열 리터럴을 건네는 건 악취로 봐야 한다.)
// 그 대신 직원 유형을 팩터리 함수의 이름에 녹이는 방식을 권장한다.

{
    // const leadEngineer = createEngineer(document.leadEngineer);

    // 최상위
    function createEngineer(name) {
        return new Employee(name, "E");
    }
}

/* 3. 최종 코드 */
class Employee {
    constructor(name, typeCode) {
        this._name = name;
        this._typeCode = typeCode;
    }

    get name() {
        return this._name;
    }

    get type() {
        return Employee.legalTypeCodes[this._typeCode];
    }

    static get legalTypeCodes() {
        return { E: "Engineer", M: "Manager", S: "Salesperson" };
    }
}

export function createEmployee(name, typeCode) {
    return new Employee(name, typeCode);
}

export function createEngineer(name) {
    return new Employee(name, "E");
}

{
    // const candidate = createEmployee(document.name, document.empType);
    // const leadEngineer = new createEngineer(document.leadEngineer);
}
