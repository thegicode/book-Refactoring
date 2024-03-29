# Chapter 10 조건부 로직 간소화

## 10.1 조건문 분해하기 Decompose Conditional

### 배경

-   354 조건을 검사하고 그 결과에 따른 동작을 표현한 코드는 무슨 일이 일어나는지는 이야기해주지만 '왜' 일어나는지는 제대로 말해주지 않을 때가 많은 것이 문제다.
-   거대한 코드 블록이 주어지면 코드를 부위별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꿔주자.

### 예시

-   [DecomposeConditional.js](./src/chp10/DecomposeConditional.js)

<br>

## 10.2 조건식 통합하기 Consolidate Conditional Expession

### 배경

-   357 비교하는 조건은 다르지만 그 결과로 수행하는 동작은 똑같은 코드들이 있는데, 어차피 같은 일을 할 거라면 조건 검사도 하나로 통합하는 게 낫다. 이럴 때 'and' 연산자와 'or' 연산자를 사용하면 여러 개의 비교 로직을 하나로 합칠 수 있다.
-   함수 추출하기는 '무엇'을 하는지를 기술하던 코드를 '왜' 하는지를 말해주는 코드로 바꿔주는 효과적인 도구임일 기억하자.

### 예시: or 사용하기

-   [ConsolidateConditionalExpession.js](./src/chp10/ConsolidateConditionalExpession.js)

### 예시: and 사용하기

-   if 문이 중첩되어 나오면 and를 사용해야 한다.
-   [ConsolidateConditionalExpession2.js](./src/chp10/ConsolidateConditionalExpession2.js)

<br>

## 10.3 중첩 조건문을 보호 구문으로 바꾸기 Replace Nested Conditional with Guard Clauses

### 배경

-   361 중첩 조건문을 보호 구문으로 바꾸기 리팩터링의 핵심은 의도를 부각하는 데 있다.

    -   나는 if-then-else 구조를 사용할 떄 if절과 else절에 똑같은 무게를 두어, 코드를 읽는 이에게 양 갈래가 똑같이 중요하다는 뜻을 전달한다.
    -   이와 달리, 보호 구문은 "이건 이 함수의 핵심이 아니다. 이 일이 일어나면 무언가 조치를 취한 후 함수에서 빠져나온다."라고 이야기한다.

-   [ReplaceNestedConditionalwithGuardClauses.js](./src/chp10/ReplaceNestedConditionalwithGuardClauses.js)

### 예시: 조건 반대로 만들기

-   이 리팩터링을 수행할 때는 조건식을 반대로 만들어 적용하는 경우도 많다고 알려왔다.
-   [ReplaceNestedConditionalwithGuardClauses2.js](./src/chp10/ReplaceNestedConditionalwithGuardClauses2.js)

<br>

## 10.4 조건부 로직을 다형성으로 바꾸기 Replace Conditional with Polymorphism

### 배경

-   복잡한 조건부 로직은 프로그래밍에서 해석하기 가장 난해한 대상에 속한다.
-   조건부 로직을 직관적으로 구조화할 방법을 항상 고민한다.
-   흔한 예로, 타입을 여러 개 만들고 각 타입이 조건부 로직을 자신만의 방식으로 처리하도록 구성하는 방법이 있다.
    -   이런 경우 case별로 클래스를 하나씩 만들어 공통 switch 로직의 중복을 없앨 수 있다.
    -   다형성을 활용하여 어떻게 동작할지를 각 타입이 알아서 처리하도록 하면 된다.
-   다른 예, 기본 동작을 위한 case문과 그 변형 동작으로 구성된 로직을 떠올릴 수 있다.
    -   먼저 이 로직을 슈퍼클래스로 넣어서 변형 동작에 신경 쓰지 않고 기본에 집중하게 한다.
-   다형성은 객체 지향 프로그래밍의 핵심이다.

### 예시

-   [ReplaceConditionalWithPolymorphism.js](./src/chp10/ReplaceConditionalWithPolymorphism.js)

### 예시: 변형 동작을 다형성으로 표현하기

-   [ReplaceConditionalWithPolymorphism2.js](./src/chp10/ReplaceConditionalWithPolymorphism2.js)

<br>

## 10.5 특이 케이스 추가하기 Introduce Special Case -> 코드 정리가 안됐음.

### 배경

-   388 코드베이스에서 특정 값에 대해 똑같이 반응하는 코드가 여러 곳이라면 그 반응들을 한 데로 모으는 게 효율적이다.
-   특수한 경우의 공통 동작을 요소 하나에 모아서 사용하는 특이 케이스 패턴 Special Case Pattern이라는 것이 있는데, 바로 이럴 때 적용하면 좋은 메커니즘이다.
-   특이 케이스 객체에서 단순히 데이터를 읽기만 한다면 반환할 값들을 담은 리터럴 객체 형태로 준비하면 된다. 그 이상의 어떤 동작을 수행해야 한다면 필요한 메서드를 담은 객체를 생성하면 된다. 특이 케이스 객체는 이를 캡슐화한 클래스가 반한하도록 만들 수도 있고, 변환 transform을 거쳐 데이터 구조에 추가시키는 형태도 될 수 있다.
-   null은 특이 케이스로 처리해야 할 때가 많다. 그래서 이 패턴을 Null Object Pattern이라고도 한다.

### 예시

-   [IntroduceSpecialCase.js](./src/chp10/IntroduceSpecialCase.js)

### 예시 : 객체 리터럴 이용하기

-   앞의 예처럼 정말 단순한 값을 위해 클래스까지 동원하는 건 좀 과한 감이 있다.
-   하지만 고객 정보가 갱신될 수 있어서 클래스가 꼭 필요했다.
-   한편, 데이터 구조를 읽기만 한다면 클래스 대신 리터럴 객체를 사용해도 된다.
-   같은 예를 살펴보자. 단, 이번에는 고객 정보를 갱신하는 클라이언트가 없다.
-   [IntroduceSpecialCase2.js](./src/chp10/IntroduceSpecialCase2.js)

### 예시 : 변환 함수 이용하기

-   앞의 두 예는 모두 클래스와 관련 있지만, 변환 단계를 추가하면 같은 아이디어를 레코드에도 적용할 수 있다.
-   <ins>참고로 나는 본질은 같고 정보만 덧붙이는 변환 함수의 이름을 "enrich"라 하고, 형태가 변할 때만 "transform"이라는 이름을 붙인다.</ins>
-   [IntroduceSpecialCase3.js](./src/chp10/IntroduceSpecialCase3.js)

<br>

## 10.6 어서션 추가하기 Introduce Assertion

### 배경

-   어서션은 항상 참이라고 가정하는 조건부 문장으로, 어서션이 실패했다는 건 프로그래머가 잘못했다는 뜻이다.

    -   어서션 실패는 시스템의 다른 부분에서는 절대 검사하지 않아야 하며, 어서션이 있고 없고가 프로그램 기능의 정상 동작에 아무런 영향을 주지 않도록 작성돼야 한다.

-   어서션은 프로그램이 어떤 상태임을 가정한 채 실행되는지를 다른 개발자에게 알려주는 훌륭한 소통 도구인 것이다.

    -   디버깅하기도 편하고 이런 소통 수단으로서의 가치도 있어서, 나는 추가하던 버그를 잡은 뒤에도 어서션을 코드에 남겨두곤 한다.

-   한편, 테스트 코드가 있다면 어서션의 디버깅 용도로서의 효용은 줄어든다.
    -   단위 테스트를 꾸준히 추가하여 사각을 좁히면 어서션보다 나을 따가 많다.
    -   하지만 소통 측면에서는 어서션이 여전히 맥력적이다.

### 절차

-   참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.

### 예시 : 할인과 관련한 간단한 예

-   고객은 상품 구입 시 할인율을 적용받는다.
-   [IntroduceAssertion.js](./src/chp10/IntroduceAssertion.js)

-   어서션을 남발하는 것 역시 위험하다.
    -   나는 참이라고 생각하는 가정 모두에 어서션을 달지 않는다.
    -   '반드시 참이어야 하는' 것만 검사한다.
    -   나는 프로그래머가 일으킬만한 오류에만 어서션을 사용한다.
        -   데이터를 외부에서 읽어 온다면 그 값을 검사하는 작업은 (어서션의 대상인) 가정이 아니라 (예외 처리로 대응해야 하는) 프로그램 로직의 일부로 다뤄야 한다.

<br>

## 10.7 제어 플래그를 탈출문으로 바꾸기 Replace Control Falg with Break

### 배경

-   제어 플래그란 코드의 동작을 변경하는 데 사용되는 변수를 말하며, 어딘가에서 값을 계산해 제어 플래그에 설정한 후 다른 어딘가의 조건문에서 검사하는 형태로 쓰인다.
-   모든 함수의 return문은 하나영 한다고 주장하는 사람도 있지만, 나는 동의하지 않는다.
    -   함수에서 할 일을 마쳤다면 그 사실을 return문으로 명확히 알리는 편이 낫지 않을까?

### 예시 : 사람 목록을 훑으면서 악당을 찾는 코드

-   [ReplaceControlFalgWithBreak.js](./src/chp10/ReplaceControlFalgWithBreak.js)
