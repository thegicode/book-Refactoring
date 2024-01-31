// 10.3 중첩 조건문을 보호 구문으로 바꾸기 Replace Nested Conditional with Guard Clauses

function payAmount(employee) {
    let result;

    // 퇴사한 직원인가?
    if (employee.isSeparated) {
        result = { amount: 0, reasonCode: "SEP" };
    } else {
        // 은퇴한 직원인가?
        if (employee.isRetired) {
            result = { amount: 0, reasonCode: "RET" };
        } else {
            // 급여 계산 로직
            lorem.ipsum(dolor.sitAmet);
            consectetur(adipiscing).elit();
            sed.do.eiusmod =
                tempor.incididunt.ut(lboref) && dolore(magna.aliqua);
            ut.enum.ad(minim.veniam);
            result = someFinalCouputation();
        }
    }
    return result;
}

// 이 코드는 실제로 벌어지는 중요한 일들이 중첩된 조건들에 가려서 잘 보이지 않는다.
// 이 코드가 진짜 의도한 일은 모든 조건이 거짓일 때만 실행되기 때문이다.
// 이 상황에서는 보호 구문을 사용하면 코드의 의도가 더 잘 드러난다.

// 다른 리팩터링과 마찬가지로 나는 단계를 작게 나눠 하나씩 밟아가길 좋아한다.
// 그러니 최상위 조건부터 보호 구문으로 바꿔보자.

function payAmount_1(employee) {
    let result;
    if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
    if (employee.isRetired) {
        result = { amount: 0, reasonCode: "RET" };
    } else {
        // 급여 계산 로직
        lorem.ipsum(dolor.sitAmet);
        consectetur(adipiscing).elit();
        sed.do.eiusmod = tempor.incididunt.ut(lboref) && dolore(magna.aliqua);
        ut.enum.ad(minim.veniam);
        result = someFinalCouputation();
    }
    return result;
}

// 변경 후 테스트하고 다음 조건으로 넘어간다.

function payAmount_2(employee) {
    let result;
    if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
    if (employee.isRetired) return { amount: 0, reasonCode: "RET" };

    // 급여 계산 로직
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(lboref) && dolore(magna.aliqua);
    ut.enum.ad(minim.veniam);
    result = someFinalCouputation();
    return result;
}

// 여기까지 왔다면 result 변수는 아무 일도 하지 않으므로 제거허자.

function payAmount_3(employee) {
    if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
    if (employee.isRetired) return { amount: 0, reasonCode: "RET" };

    // 급여 계산 로직
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(lboref) && dolore(magna.aliqua);
    ut.enum.ad(minim.veniam);
    return someFinalCouputation();
}

// 가변 변수를 제거하면 자다가도 떡이 생긴다는 사실을 항상 기억하자!
