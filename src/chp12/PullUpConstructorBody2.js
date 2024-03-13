/**
 * 12.3.2 생성자 본문 올리기 Pull Up Constructor Body
 */

{
    class Employee {
        constructor(name) {
            //
        }

        get isPrivileged() {
            //
        }

        assignCart() {
            //
        }
    }

    class Manager extends Employee {
        constructor(name, grade) {
            super(name);
            this._grade = grade;
            if (this.isPrivileged) this.assignCart(); // 모둔 서브클래스가 수항핸다.
        }

        get isPrivileged() {
            return this._grade > 4;
        }
    }
}

/**
 * 이렇게 될 수 밖에 없는 이유는 isPrivileged()는 grade 필드에 값이 대입된 후에야 호출될 수 있고,
 * 서브클래스만이 이 필드에 값을 대입할 수 있기 때문이다.
 *
 * 이런 경우라면 먼저 공통 코드를 함수로 추출(6.1절)하자.
 */

{
    class Manager extends Employee {
        constructor(name, grade) {
            super(name);
            this._grade = grade;
            this.finishConstruction();
        }

        finishConstruction() {
            if (this.isPrivileged) this.assignCart();
        }
    }
}

// 그런 다음 추출한 메서드를 슈퍼클래스로 옮긴다. (메서드 옮기기 12.1절)

class Employee {
    constructor(name) {
        //
    }

    get isPrivileged() {
        //
    }

    assignCart() {
        //
    }

    finishConstruction() {
        if (this.isPrivileged) this.assignCart();
    }
}

class Manager extends Employee {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }

    get isPrivileged() {
        return this._grade > 4;
    }
}
