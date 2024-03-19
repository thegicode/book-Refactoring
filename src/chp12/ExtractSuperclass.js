/**
 * 12.8 슈퍼클래스 추출하기 Extract Superclass
 */
{
    class Employee {
        constructor(name, id, monthlyCost) {
            this._id = id;
            this._name = name;
            this._monthlyCost = monthlyCost;
        }

        // 월간 비용
        get monthlyCost() {
            return this._monthlyCost;
        }

        get name() {
            return this._name;
        }

        get id() {
            return this._id;
        }

        // 연간 비용
        get annualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Department {
        constructor(name, staff) {
            this._name = name;
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        get name() {
            return this._name;
        }

        // 총 월간비용
        get totalMonthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }

        // 총 연간 비용
        get totalAnnualCost() {
            return this.totalMonthlyCost * 12;
        }
    }
}
/**
 * 두 클래스로부터 슈퍼클래스를 추출하면 이 공통된 동작들을 더 명확하게 드러낼 수 있다.
 * 우선 빈 슈퍼클래스를 만들고, 두 클래스가 이를 확장하도록 한다.
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

        // 월간 비용
        get monthlyCost() {
            return this._monthlyCost;
        }

        get name() {
            return this._name;
        }

        get id() {
            return this._id;
        }

        // 연간 비용
        get annualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Department extends Party {
        constructor(name, staff) {
            super();
            this._name = name;
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        get name() {
            return this._name;
        }

        // 총 월간비용
        get totalMonthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }

        // 총 연간 비용
        get totalAnnualCost() {
            return this.totalMonthlyCost * 12;
        }
    }
}

/**
 * 나는 슈퍼클래스 추출하기를 적용할 때 데이터부터 바꿔나가는 걸 좋아하는데, 자바스크립트에서는 이때 생성자를 만져줘야 한다.
 * 그러니 먼저 이름 속성을 위로 올려보자(필드 올리기 12.2절)
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

        // 월간 비용
        get monthlyCost() {
            return this._monthlyCost;
        }

        get name() {
            return this._name;
        }

        get id() {
            return this._id;
        }

        // 연간 비용
        get annualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Department extends Party {
        constructor(name, staff) {
            super(name);
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        get name() {
            return this._name;
        }

        // 총 월간비용
        get totalMonthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }

        // 총 연간 비용
        get totalAnnualCost() {
            return this.totalMonthlyCost * 12;
        }
    }
}

// 데이터를 슈퍼클로스로 옮겼으니, 다음은 그 데이터와 관련된 메서드를 차례다(메서드 올리기 12.1절).
// 지금 예에서는 name() 메서드가 해당한다.
{
    class Party {
        constructor(name) {
            this._name = name;
        }

        get name() {
            return this._name;
        }
    }

    class Employee extends Party {
        constructor(name, id, monthlyCost) {
            super(name);
            this._id = id;
            this._monthlyCost = monthlyCost;
        }

        // 월간 비용
        get monthlyCost() {
            return this._monthlyCost;
        }

        get id() {
            return this._id;
        }

        // 연간 비용
        get annualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Department extends Party {
        constructor(name, staff) {
            super(name);
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        // 총 월간비용
        get totalMonthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }

        // 총 연간 비용
        get totalAnnualCost() {
            return this.totalMonthlyCost * 12;
        }
    }
}

// 다음으로, 구현 로직이 비슷한 메서드가 두 개 보인다.
{
    class Employee extends Party {
        // 연간 비용
        get annualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Department extends Party {
        // 총 연간 비용
        get totalAnnualCost() {
            return this.totalMonthlyCost * 12;
        }
    }
}

/**
 * 이 두 메서드에서 호출하는 메서드(monthlyCost()와 totalMonthlyCost())는 이름도 다르고 본문 코드도 다르다.
 * 그렇다면 함수 선언 바꾸기(6.5절)로 이름을 통일한다.
 */

{
    class Department extends Party {
        constructor(name, staff) {
            super(name);
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        // 총 월간비용
        get monthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }

        // 총 연간 비용
        get totalAnnualCost() {
            return this.monthlyCost * 12;
        }
    }
}

// 같은 방식으로 연간 비용 산출 메서드의 이름도 통일한다.
{
    class Department extends Party {
        constructor(name, staff) {
            super(name);
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        // 총 월간비용
        get monthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }

        // 총 연간 비용
        get annualCost() {
            return this.monthlyCost * 12;
        }
    }
}

// 이제 두 연간 비용 산출 메서드에 메서드 올리기(12.1절)를 적용할 수 있다.
{
    class Party {
        constructor(name) {
            this._name = name;
        }

        get name() {
            return this._name;
        }

        get annualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Employee extends Party {
        constructor(name, id, monthlyCost) {
            super(name);
            this._id = id;
            this._monthlyCost = monthlyCost;
        }

        // 월간 비용
        get monthlyCost() {
            return this._monthlyCost;
        }

        get id() {
            return this._id;
        }
    }

    class Department extends Party {
        constructor(name, staff) {
            super(name);
            this._staff = staff;
        }

        get staff() {
            return this._staff;
        }

        // 총 월간비용
        get monthlyCost() {
            return this.staff
                .map((e) => e.monthlyCost)
                .reduce((sum, cost) => sum + cost);
        }

        get headCount() {
            return this.staff.length;
        }
    }
}
