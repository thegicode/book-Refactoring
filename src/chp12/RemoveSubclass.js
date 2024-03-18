/**
 *  12.7 서브클래스 제거하기 Remove Subclass
 *
 */

{
    class Person {
        constructor(name) {
            this._name = name;
        }

        get name() {
            return this._name;
        }

        get genderCode() {
            return "X";
        }
    }

    class Male extends Person {
        get genderCode() {
            return "M";
        }
    }

    class Female extends Person {
        get genderCode() {
            return "F";
        }
    }
}

/**
 * 서브클래스가 하는 일이 이게 다라면 굳이 존재할 이유가 없다.
 * 하지만 바로 제거하지 말고 혹시라도 이 클래스들을 사용하는 클라이언트가 있는지 살펴봐야 한다.
 * 지금 예에서는 그런 코드를 찾지 못했다고 치자.
 */

{
    // 클라이언트
    const numberOfMales = peope.filter((p) => p instanceof Male).length;
}

/**
 * 나는 무언가의 표헌 방법을 바꾸려 할 때먼 먼저 현재의 표현을 캡슐화하여 이 변화가 클라이언트 코드에는 주는 영향을 최소화한다.
 * 서브클래스 만들기를 캡슐화하는 방법은 바로 생성자를 팩터리 함수(11.8절)로 바꾸기다.
 * 지금의 예라면 팩터리를 만드는 방법이 여러 가지다.
 * 가장 직관적인 방법은 팩터리 메서드를 생성자 하나당 하나씩 만드는 것이다.
 */

{
    function createPerson(name) {
        return new Person(name);
    }

    function createName(name) {
        return new Male(name);
    }

    function createFemale(name) {
        return new Female(name);
    }
}
// 직관적이긴 해도 이런 류의 객체는 성별 gender 코드를 사용하는 곳에서 직접 생성될 가능성이 크다.

{
    function loadFromInput(data) {
        const result = [];
        data.forEach((aRecord) => {
            let p;
            switch (aRecord.gender) {
                case "M":
                    p = new Male(aRecord.name);
                    break;
                case "F":
                    p = new Female(aRecord.name);
                    break;
                default:
                    p = new Person(aRecord.name);
            }
            result.push(p);
        });
        return result;
    }
}

// 그렇다면 생성할 클래스를 선택하는 로직을 함수로 추출(6.1절)하고, 그 함수를 팩터리 함수로 삼는 편이 낫다.

{
    function createPerson(aRecord) {
        let p;
        switch (aRecord.gender) {
            case "M":
                p = new Male(aRecord.name);
                break;
            case "F":
                p = new Female(aRecord.name);
                break;
            default:
                p = new Person(aRecord.name);
        }
        return p;
    }

    function loadFromInput(data) {
        const result = [];
        data.forEach((aRecord) => {
            result.push(createPerson(aRecord));
        });
        return result;
    }
}

// 이제 두 함수를 깔끔히 청소해보자.
// createPerson()에서 변수 p를 인라인(6.4절) 한다.

{
    function createPerson(aRecord) {
        switch (aRecord.gender) {
            case "M":
                return new Male(aRecord.name);
                break;
            case "F":
                return new Female(aRecord.name);
                break;
            default:
                return new Person(aRecord.name);
        }
    }
}

// 그런 다음 loadFromInput()의 반복문을 파이프라인으로 바꾼다. (8.8절)

{
    function loadFromInput(data) {
        return data.map((aRecord) => createPerson(aRecord));
    }
}

/**
 * 이 팩터리가 서브클래스 생성을 캡슐화해주지만 코드의 다른 부분에선 instanceof를 사용하는 모습이 눈에 뛴다.
 * 이 타입 검사 코드를 함수로 추출(6.1절) 한다.
 */

{
    // 클라이언트
    const numberOfMales = peope.filter((p) => isMale(p)).length;

    function isMale(aPerson) {
        return aPerson instanceof Male;
    }
}

/**
 * 이상으로 서브클래스 관련 정보 모두를 슈퍼클래스와 팩터리 함수로 안전하게 담아냈다.
 * (서브클래스를 참조하는 슈퍼클래스는 지양해야 하지만 지금 코드는 바로 다음 단계에서 정리될 것이믈 신경쓰지 않기로 하자.)
 *
 * 이제 서브클래스들의 차이(성별)를 나타낼 필드를 추가한다.
 * 성별 정보는 Person 클래스 외부에서 정해 전달하는 방식이니 생성자에서 매개변수로 받아 설정하도록 작성한다.
 */

{
    class Person {
        constructor(name, genderCode) {
            this._name = name;
            this._genderCode = genderCode || "X";
        }

        get name() {
            return this._name;
        }

        get genderCode() {
            return this._genderCode;
        }
    }
}

// 초기화할 때는 기본값으로 설정한다.

/**
 * 그런 다음 남성인 경우의 로직을 슈퍼클래스로 옮긴다.
 * 이를 위해 팩터리는 Person을 반환하도록 수정하고 instanceof를 사용해 검사하던 코드는 성별 코드 필드를 이용하도록 수정한다.
 */

{
    function createPerson(aRecord) {
        switch (aRecord.gender) {
            case "M":
                return new Person(aRecord.name, "M");
                break;
            case "F":
                return new Female(aRecord.name);
                break;
            default:
                return new Person(aRecord.name);
        }
    }

    class Person {
        constructor(name, genderCode) {
            this._name = name;
            this._genderCode = genderCode || "X";
        }

        get name() {
            return this._name;
        }

        get genderCode() {
            return this._genderCode;
        }

        get isMale() {
            return "M" === this._genderCode;
        }
    }
}

// 테스트에 성공하면 남성 서브클래스를 제거한다.
// 또 테스트하여 성공하면 여성 서브클래스도 같은 방식으로 제거한다.

class Person {
    constructor(name, genderCode) {
        this._name = name;
        this._genderCode = genderCode;
    }

    get name() {
        return this._name;
    }

    get genderCode() {
        return this._genderCode;
    }

    get isMale() {
        return "M" === this._genderCode;
    }
}

function createPerson(aRecord) {
    switch (aRecord.gender) {
        case "M":
            return new Person(aRecord.name, "M");
            break;
        case "F":
            return new Person(aRecord.name, "F");
            break;
        default:
            return new Person(aRecord.name, "X");
    }
}
