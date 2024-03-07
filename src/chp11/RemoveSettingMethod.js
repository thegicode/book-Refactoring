/*
 *  11.7 세터 제거하기 Remove Setting Method
 */

{
    class Person {
        get name() {
            return this._name;
        }
        set name(arg) {
            this._name = arg;
        }

        get id() {
            return this._id;
        }
        set id(arg) {
            this._id = arg;
        }
    }

    // 사람 객체를 하나 생성
    const martin = new Person();
    martin.name = "Martin";
    martin.id = "1234";
}

// 사람의 속성 중 이름은 객체를 생성한 뒤라도 변경될 수 있겠지만 id는 그러면 안 된다.
// 이 의도를 명확히 알리기 위해 ID 세터를 없애보자.

// 1. 최초 한 번은 ID를 설정할 수 있어야 하므로 함수 선언 바꾸기(6.5절)로 생성자에서 ID를 받도록 한다.
{
    class Person {
        constructor(id) {
            this.id = id;
        }
        get name() {
            return this._name;
        }
        set name(arg) {
            this._name = arg;
        }

        get id() {
            return this._id;
        }
        set id(arg) {
            this._id = arg;
        }
    }
}

// 2. 그런 다음 생성 스크립트가 이 생성자를 통해 ID를 설정하게끔 수정한다.
{
    const martin = new Person("1234");
    martin.name = "Martin";
}

// 3. 이 작업을 사람 객체를 생성하는 모든 곳에서 수행하며, 하나 수정할 때마다 테스트한다.
// 모두 수정했다면 세터 메서드를 인라인(6.2절) 한다.

class Person {
    constructor(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(arg) {
        this._name = arg;
    }

    get id() {
        return this._id;
    }
}

const martin = new Person("1234");
martin.name = "Martin";
