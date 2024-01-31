// 10.2 Consolidate Conditional Expession

function disablilityAmount(anEmployee) {
    if (anEmployee.seniority < 2) return 0;
    if (anEmployee.monthDisabled > 12) return 0;
    if (anEmployee.isPartTime) return 0;
}

// 똑같은 결과로 이어지는 조건 검사가 순차적으로 진행되고 있다.
// 결과로 행하는 동작이 같으므로 이 조건들을 하나의 식으로 통합해보자.
// 이처럼 순차적인 경우엔 or 연산자를 시용하면 된다.

function disablilityAmount_1(anEmployee) {
    if (anEmployee.seniority < 2 || anEmployee.monthDisabled > 12) return 0;
    if (anEmployee.isPartTime) return 0;
}

// 테스트한 후 그다음 조건에도 적용한다.
function disablilityAmount_2(anEmployee) {
    if (
        anEmployee.seniority < 2 ||
        anEmployee.monthDisabled > 12 ||
        anEmployee.isPartTime
    )
        return 0;
}

// 모든 조건을 통합했다면 최종 조건식을 함수로 추출해볼 수 있다.
function disablilityAmount_3(anEmployee) {
    if (isNotEligibleForDisability()) return 0;

    // 장애 수당 적용 여부 확인
    function isNotEligibleForDisability() {
        if (
            anEmployee.seniority < 2 ||
            anEmployee.monthDisabled > 12 ||
            anEmployee.isPartTime
        )
            return 0;
    }
}
