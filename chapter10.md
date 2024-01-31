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
