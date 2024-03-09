/**
 * 11.11 수정된 값 반환하기 Return Modified Value
 * GPS 위치 목록으로 다양한 계산을 수행하는 코드
 */

{
    let totalAscent = 0;
    let totalTime = 0;
    let totalDisatance = 0;
    calculateAscent();
    calculateTime();
    claculateDistance();
    const pace = totlaTime / 60 / totalDisatance;
}

// 이번 리팩터링에서는 고도 상승분 ascent 계산만을 고려할 것이다.

{
    function calculateAscent() {
        for (let i = 0; i < points.length; i++) {
            const verticalCharge =
                points[i].elevation - points[i - 1].elevation;
            totalAscent += verticalCharge > 0 ? verticalCharge : 0;
        }
    }
}

/**
 * 이 코드에서는 calculateAscent() 안에서 totalAscent가 갱신된다는 사실을 드러나지 않으므로
 * calculateAscent()와 외부 환경이 어떻게 연결돼 있는지가 숨겨진다.
 * 갱신 사실을 밖으로 알려보자.
 *
 * 먼저 totalAscent 값을 반환하고, 호출한 곳에서 변수에 대입하게 고친다.
 */

{
    let totalAscent = 0;
    let totalTime = 0;
    let totalDisatance = 0;
    totalAscent = calculateAscent();
    calculateTime();
    claculateDistance();
    const pace = totlaTime / 60 / totalDisatance;

    function calculateAscent() {
        for (let i = 0; i < points.length; i++) {
            const verticalCharge =
                points[i].elevation - points[i - 1].elevation;
            totalAscent += verticalCharge > 0 ? verticalCharge : 0;
        }
        return totalAscent;
    }
}

/**
 * 그런 다음 calculateAscent() 안에 반환할 값을 담을 변수인 totalAscent를 선언한다.
 * 그런데 이 결과 부모 코드에 있는 똑같은 이름의 변수가 가려진다.
 */

{
    function calculateAscent() {
        let totalAscent;
        for (let i = 0; i < points.length; i++) {
            const verticalCharge =
                points[i].elevation - points[i - 1].elevation;
            totalAscent += verticalCharge > 0 ? verticalCharge : 0;
        }
        return totalAscent;
    }
}

/** 이 문제를 피하기 위해 변수의 이름을 일반적인 명명규칙에 맞게 수정한다. */

{
    function calculateAscent() {
        let result;
        for (let i = 0; i < points.length; i++) {
            const verticalCharge =
                points[i].elevation - points[i - 1].elevation;
            result += verticalCharge > 0 ? verticalCharge : 0;
        }
        return result;
    }
}

/** 그런 다음 이 계산이 변수 선언과 동시에 수행되도록 하고, 변수에 const를 붙여서 불변으로 만든다. */

{
    const totalAscent = calculateAscent();
    let totalTime = 0;
    let totalDisatance = 0;
    calculateTime();
    claculateDistance();
    const pace = totlaTime / 60 / totalDisatance;
}

/** 같은 과정을 다른 함수들에도 반복해 적용해주면 호출하는 쪽 코드가 다음처럼 바뀔 것이다. */

{
    const totalAscent = calculateAscent();
    const totalTime = calculateTime();
    const totalDisatance = claculateDistance();
    const pace = totlaTime / 60 / totalDisatance;
}
