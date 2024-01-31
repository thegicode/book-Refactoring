// ## 10.3 중첩 조건문을 보호 구문으로 바꾸기 Replace Nested Conditional with Guard Clauses

function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital > 0) {
        if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
            result =
                (anInstrument.income / anInstrument.duration) *
                anInstrument.adjustmentRactor;
        }
    }
    return result;
}

// 역시 한 번에 하나씩 수정한다. 다만 이번에는 보호 구문을 추가하면서 조건을 역으로 바꿀 것이다.

function adjustedCapital_1(anInstrument) {
    let result = 0;

    if (anInstrument.capital <= 0) return result;

    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
        result =
            (anInstrument.income / anInstrument.duration) *
            anInstrument.adjustmentRactor;
    }
    return result;
}

// 다음 조건은 살짝 더 복잡하므로 두 단계로 나눠 진행하겠다. 먼저 간단히 not 연산자(!)를 추가한다.

function adjustedCapital_2(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0))
        return result;
    result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentRactor;
    return result;
}

// 이처럼 조건식 안에 not이 있으면 영 개운치 않으니 다음처럼 간소화한다.

function adjustedCapital_3(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (anInstrument.interestRate <= 0 || anInstrument.duration <= 0)
        return result;
    result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentRactor;
    return result;
}

// 두 if문 모두 같은 결과를 내는 조건을 포함하니 조건식을 통합한다.

function adjustedCapital_4(anInstrument) {
    let result = 0;
    if (
        anInstrument.capital <= 0 ||
        anInstrument.interestRate <= 0 ||
        anInstrument.duration <= 0
    )
        return result;
    result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentRactor;
    return result;
}

// 여기서의 result 변수는 두 가지 일을 한다.
// 처음 설정한 값 0은 보호 구문이 발동했을 때 반환할 값이다.
// 두 번째로 설정한 값은 계산의 최종 결과다.
// 이 변수를 제거하면 변수 하나가 두 가지 용도로 쓰이는 상황이 사라진다.

function adjustedCapital_5(anInstrument) {
    if (
        anInstrument.capital <= 0 ||
        anInstrument.interestRate <= 0 ||
        anInstrument.duration <= 0
    )
        return 0;

    return (
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentRactor
    );
}
