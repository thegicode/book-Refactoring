// 10.2 조건식 통합하기 Consolidate Conditional Expession

{
    if (anEmployee.onVacation) if (anEmployee.seniority > 10) return 1;
    return 0.5;
}

// 이 조건들을 and 연산자로 결합해보자.
{
    if (anEmployee.onVacation && anEmployee.seniority > 10) return 1;
    return 0.5;
}
