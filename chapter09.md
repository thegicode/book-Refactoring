# Chapter 09 데이터 조직화

-   329 데이터 구조에 집중한 리팩토링
    -   하나의 값이 여러 목적으로 사용된다면 혼란과 버그를 낳는다.
        -> 변수 쪼개기를 적용해 용도별로 분리하자.
-   변수 이름 바꾸기,
-   파생 변수를 질의 함수로 바꾸기를 활용하여 변수 자체를 완전히 없애는 해법
-   참조reference 인지 값 value 인지가 헷살려 문제가 되는 코드를 자주 볼 수 있는데, 둘 사이를 전환할 때는 참조를 값으로 바꾸기 와 값을 참조로 바꾸기를 사용
-   매직 리터럴 바꾸기

<br>

## 9.1 변수 쪼개기 Split Varaible

### 배경

-   변수는 다양한 용도로 쓰인다.
    -   변수에 값을 여러 번 대입할 수밖에 없는 경우
        -   루프 변수 loop variable : 반복문
        -   수집 변수 collecting variable : 메서드가 동작을 중간중간 값을 저장
    -   긴 코드의 결과를 저장했다가 나중에 쉽게 참조하려는 목적으로 쓰인다.
        -> 이런 변수에는 값을 단 한 번만 대입해야 한다.
        -> 대입이 두 번 이상 이뤄진다면 여러 가지 역학을 수행한다는 신호
        -> 역할이 둘 이상인 변수가 있다면 쪼개야 한다.
    -   역할 하나당 변수 하나다.

### 예시 : 해기스라는 음식이 다른 지역으로 전파된 거리를 구하는 코드

-   [SplitVariable.js](./src/chp09/SplitVariable.js)

### 예시 : 입력 매개변수의 값을 수정할 때

-   변수 쪼개기의 또 다른 예로 입력 매개변수를 생각해 볼 수 있다.

-   [SplitVariable2.js](./src/chp09/SplitVariable2.js)

<br>

## 9.2 필드 이름 바꾸기 Rename Field

### 배경

-   334 이름은 중요하다. 레코드 구조체의 필드 이름들은 특히 더 중요하다.

    -   데이터 구조는 프로그램을 이해하는 데 큰 역할을 한다.
    -   데이터 구조는 무슨 일이 벌어지는지를 이해하는 열쇠다.

-   데이터 구조가 중요한 만큼 반드시 깔끔하게 괸라해야 한다.
    -   깊어진 이해를 프로그램에 반드시 반영해야 한다.
-   클래스 마찬가지

-   [Rename.js](./src/chp09/RenameField.js)

<br>

## 9.3 파생 변수를 질의 함수로 바꾸기 Replace Derived Variable with Query

### 배경

-   338 가변 데이터의 유료 범위를 가능한 한 좁혀야 한다.
-   효과가 좋은 방법으로, 값을 쉽게 계산해낼 수 있는 변수들을 모두 제거할 수 있다.

## 예시

-   [ReplaceDerivedVariableWithQuery.js](./src/chp09/ReplaceDerivedVariableWithQuery.js)

## 예시 : 소스가 둘 이상일 때

-   때에 따라서는 둘 이상의 요소가 관여되기도 한다.
-   [ReplaceDerivedVariableWithQuery2.js](./src/chp09/ReplaceDerivedVariableWithQuery2.js)

<br>

## 9.4 참조를 값으로 바꾸기 Change Reference to Value

### 배경

-   객체(데이터 구조)를 다른 객체(데이터 구조)에 중첩하면 내부 객체를 참조 혹은 값으로 취급할 수 있다.
-   [ChangeReferenceToValue.js](./src/chp09/ChangeReferenceToValue.js)

<br>

## 9.5 값을 참조로 바꾸기 Change Value to Reference

## 배경

-   347 값으로 다룬다면 고객 데이터가 각 주문에 복사되고, 참조로 다룬다면 여러 주문이 단 하나의 데이터 구조를 참조하게 된다.
-   348 값을 참조로 바꾸면 entity 하나당 객체도 단 하나만 존재하게 되는데, 그러면 보통 이런 객체들을 한데 모아놓고 클라이언트들의 접근을 관리해주는 일종의 저장소가 필요해진다. 각 엔티티를 표현하는 객체를 한 번만 만들고, 객체가 필요한 곳에서는 모두 이 저장소로부터 얻어 ㅆ느는 방식이 된다.

## 예시 : Order class,

-   [ChangeValueToReference.js](./src/chp09/ChangeValueToReference.js)

<br>

## 9.6 매직 리터럴 바꾸기 Replace Magic Literal

## 배경

-   351 magic literal이란 소스 코드에 (보통은 여러 곳에) 등장하는 일반적인 리터럴 값을 말한다.
-   상수를 정의하고 숫자 대신 상수를 사용하도록 바꾸면 될 것이다.
-   일반적으로 해당 값이 쓰이는 모든 곳을 적절한 이름의 상수로 바꿔주는 방법이 가장 좋다.
-   다른 선택지도 있는데, 그 상수가 특별한 비교 로직에 주로 쓰이는 경우에 고려해볼 수 있는 방법이다.
    -   예) aValue === "M" -> isMale(aValue) 라는 호출 함수로 바꾸는 쪽을 선호한다.
