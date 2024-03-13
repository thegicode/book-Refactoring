/**
 * 12.3 생성자 본문 올리기 Pull Up Constructor Body
 */

{
    class Party {}

    class Employee extends Party {
        constructor(name, id, monthlyCost) {
            super();
            this._id = id;
            this._name = name;
            this._monthlyCost = monthlyCost;
        }
        // 생략
    }

    class Department extends Party {
        constructor(name, staff) {
            super();
            this._name = name;
            this._staff = staff;
        }
        // 생략
    }
}

/**
 * 여기서 공통 코드는 this._name = name; 이라는 이름 대입 부분이다.
 * Employee에서 이 대입문을 슬라이드하여 super() 호출 바로 아래로 옮긴다.(문장 슬라이드하기 8.6절)
 */

{
    class Employee extends Party {
        constructor(name, id, monthlyCost) {
            super();
            this._name = name;
            this._id = id;
            this._monthlyCost = monthlyCost;
        }
        // 생략
    }
}

/**
 * 테스트가 성공하면 이 공통 코드를 슈퍼클래스로 옮긴다.
 * 이 코드가 생성자의 인수인 name을 참조하므로 이 인수를 슈퍼클래스 생성자에서 매개변수로 건넨다.
 */

{
    class Party {
        constructor(name) {
            this._name = name;
        }
    }

    class Employee extends Party {
        constructor(name, id, monthlyCost) {
            super(name);
            this._id = id;
            this._monthlyCost = monthlyCost;
        }
    }

    class Department extends Party {
        constructor(name, staff) {
            super(name);
            this._staff = staff;
        }
    }
}

// 테스트를 돌려 모두 통과하면 리팩터링이 끝난다.
