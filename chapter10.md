# Chapter 10 조건부 로직 간소화

## 10.1 조건문 분해하기 Decompose Conditional

### 배경

-   354 조건을 검사하고 그 결과에 따른 동작을 표현한 코드는 무슨 일이 일어나는지는 이야기해주지만 '왜' 일어나는지는 제대로 말해주지 않을 때가 많은 것이 문제다.
-   거대한 코드 블록이 주어지면 코드를 부위별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꿔주자.

### 예시

-   [DecomposeConditional.js](./src/chp10/DecomposeConditional.js)
