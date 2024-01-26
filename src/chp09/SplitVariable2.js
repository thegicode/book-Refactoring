function discount(inputValue, quantity) {
    if (inputValue > 0) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}

// inputValue는 함수에 데이터를 전달하는 용도와 결과를 호출자에 반환하는 용도로 쓰였다.
// inputValue를 쪼개야 한다.

function discount_1(originInputValue, quantity) {
    let inputValue = originInputValue;
    if (inputValue > 0) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}

// 변수 이름 바꾸기 를 두 번 수행해서 각각의 쓰임에 어울리는 이름을 주어진다.

function discount_2(inputValue, quantity) {
    let result = inputValue;
    if (inputValue > 0) result = inputValue - 2;
    if (quantity > 100) result = result - 1;
    return result;
}
// 첫 번쨔 if문에서 (result가 아닌) inputValue와 비교하도록 수정
// 이 코드가 입력값에 기초하여 결과값을 누적해 계산한다는 사실을 더 명확히 드러낸다.
