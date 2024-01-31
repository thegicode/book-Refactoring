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
