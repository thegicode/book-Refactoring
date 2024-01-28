// 여름철이면 한인율이 달라지는 어떤 서비스의 요금을 계산하다.

// 0
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
else charge = quantity * plan.regularRate + plan.regularServiceCharge;

// 1. 우선 조건 부분(조건식)을 별도 함수로 추출하자.
if (summer()) charge = quantity * plan.summerRate;
else charge = quantity * plan.regularRate + plan.regularServiceCharge;

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

// 2. 조건이 만족했을 때의 로직도 또 다른 함수로 추출
if (summer()) charge = summerCharge();
else charge = quantity * plan.regularRate + plan.regularServiceCharge;

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
    return quantity * plan.summerRate;
}

// 3. else 절도 별도 함수로 추출
if (summer()) charge = summerCharge();
else charge = regularCharge();

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
    return quantity * plan.summerRate;
}

function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}

// 모두 끝났다면 취향에 따라 전체 조건문을 3항 연산자로 바꿔줄 수도 있다.
charge = summer() ? summerCharge() : regularCharge();

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
    return quantity * plan.summerRate;
}

function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}
