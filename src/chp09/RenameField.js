// Rename Field

const organization = { name: "애크리 구스베리", country: "GB" };

// name을 title로 바꾸고 싶다.
// 이 객체는 코드베이스 곳곳에서 사용, 그중 이 title을 변경하는 곳도 있다.
// 그래서 우선 organization 레코드를 클래스로 캠슐화한다.

class Organization1 {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }

    get name() {
        return this._name;
    }
    set name(aString) {
        this._name = aString;
    }

    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

const organization1 = new Organization1({
    name: "애크리 구스베리",
    country: "GB",
});

// 레코드를 클래스로 캡슐화하자 이름을 변경할 곳이 네 곳이 되었다.
// 게터 함수, 세터 함수, 생성자, 내부 데이터 구조다.
// 일을 더 키워버린 게 아닌가 싶지만, 실제로는 더 쉬워진 것이다.
// 모든 변경을 한 번에 수행하는 대신 작은 단계들로 나눠 독립적으로 수행할 수있게 됐다.

// 입력 데이터 구조를 내부 데이터 구조로 복제했으므로 둘을 구분해야 독립적으로 작업할 수 있다.
// 3. 별도의 필드를 정의하고 생성자와 접근자에서 둘을 구분해 사용

class Organization2 {
    constructor(data) {
        this._title = data.name;
        this._country = data.country;
    }

    get name() {
        return this._title;
    }
    set name(aString) {
        this._title = aString;
    }

    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

const organization2 = new Organization2({
    name: "애크리 구스베리",
    country: "GB",
});

// 생성자에서 "title"도 받아들일 수 있도록 수정
class Organization22 {
    constructor(data) {
        this._title = data.title !== undefined ? data.title : data.name;
        this._country = data.country;
    }

    get name() {
        return this._title;
    }
    set name(aString) {
        this._title = aString;
    }

    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

const organization22 = new Organization22({
    name: "애크리 구스베리",
    country: "GB",
});

// 생성자를 호출하는 쪽에서는 "name"과 "title"을 모두 사용할 수 있게 되었다.
// 이 생성자를 호출하는 곳을 모두 찾아서 새로운 이름이 "title"을 사용하도록 하나씩 수정

const organization222 = new Organization22({
    title: "애크리 구스베리",
    country: "GB",
});

// 모두 수정했다면 생성자에서 "name"을 사용할 수 있게 하던 코드를 제거한다.
class Organization3 {
    constructor(data) {
        this._title = data.title;
        this._country = data.country;
    }

    get name() {
        return this._title;
    }
    set name(aString) {
        this._title = aString;
    }

    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

const organization3 = new Organization3({
    title: "애크리 구스베리",
    country: "GB",
});

// 생성자와 데이터가 새로운 이름을 사용하게 되었으니 접근자도 수정할 수 있게 되었다.
class Organization4 {
    constructor(data) {
        this._title = data.title;
        this._country = data.country;
    }

    get title() {
        return this._title;
    }
    set title(aString) {
        this._title = aString;
    }

    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}
