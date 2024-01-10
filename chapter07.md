# Chapter 07 캡슐화

## 7.1 레코드 캡슐화하기 Encapsulate Record

### 배경

    - 나는 가변 데이터를 저장하는 용도로는 레코드보다 객체를 선호하는 편이다. 객체를 사용하면 어떻게 저장했는지를 숨긴 채 세 가지 값을 각각의 메서드로 제공할 수 있다. 사용자는 무엇이 저장된 값이고 무엇이 계산된 값인지 알 필요가 없다. 캡슐화하면 이름을 바꿀 떄도 좋다. 필드 이름을 바꿔도 기존 이름과 새 이름 모두를 각각의 메서드로 제공할 수 있어서 사용자 모두가 새로운 메서드로 옮겨갈 때까지 점진적으로 수정할 수 있다.

### 절차

    1. -> 레코드를 캡슐화하는 함수의 이름은 검색하기 쉽게 지어준다.