/**
 *  12.1 메서드 올리기 Pull Up Method
 */

// 1. 두 서브클래스에서 같은 일을 수행하는 메서드를 찾았다.
{
    class Employee extends Party {
        get anualCost() {
            return this.monthlyCost * 12;
        }
    }

    class Department extends Party {
        get totalAnualCost() {
            return this.monthlyCost * 12;
        }
    }
}
/**
 * 2. 두 메서드에서 참조하는 monthlyCost() 속성은 슈퍼클래스에는 정의되어 있지 않지만
 * 두 서브클래스 모두에 존재한다.
 *
 * 두 메서드의 이름이 다르므로 함수 선언 바꾸기(6.5절)로 이름을 통일한다.
 */

{
    class Department extends Party {
        get anualCost() {
            return this.monthlyCost * 12;
        }
    }
}

// 서브클래스 중 하나의 메서드를 복사해 슈퍼클래스에 붙여넣는다.

{
    class Party {
        get anualCost() {
            return this.monthlyCost * 12;
        }
    }
}

// 먼저 Employee에서 anualCost()를 제거하고, 테스트하고, Department에서도 제거한다.
{
    class Employee extends Party {}

    class Department extends Party {}
}
