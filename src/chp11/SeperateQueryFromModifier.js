/**
 *  11.1 질의 함수와 변경 함수 분리하기 Seperate Query from Modifier
 * 훑어 악당 miscreant을 찾는 함수
 * 악당을 찾으면 그 사람의 이름을 반환하고 경고를 울린다.
 * 가장 먼저 찾은 악당만 취급한다.
 */

{
    function alertForMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                setOffAlarms();
                return "Kim";
            }
            if (p === "Choi") {
                setOffAlarms();
                return "Choi";
            }
        }
        return "";
    }
}

// 1. 첫 단계는 함수를 복제하고 질의 목적에 맞는 이름짓기다.
{
    function alertForMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                setOffAlarms();
                return "Kim";
            }
            if (p === "Choi") {
                setOffAlarms();
                return "Choi";
            }
        }
        return "";
    }
    function findMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                setOffAlarms();
                return "Kim";
            }
            if (p === "Choi") {
                setOffAlarms();
                return "Choi";
            }
        }
        return "";
    }
}

// 2. 새 질의 함수에서 부수효과를 낳는 부분을 제거한다.
{
    function alertForMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                setOffAlarms();
                return "Kim";
            }
            if (p === "Choi") {
                setOffAlarms();
                return "Choi";
            }
        }
        return "";
    }
    function findMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                // setOffAlarms(); 제거
                return "Kim";
            }
            if (p === "Choi") {
                // setOffAlarms();  제거
                return "Choi";
            }
        }
        return "";
    }
}

// 3. 이제 원래 함수를 호출하는 곳을 모두 찾아서 새로운 질의 함수를 호출하도록 바꾸고,
// 이어서 원래의 변경 함수를 호출하는 코드를 바로 아래에 삽입한다.
// 예컨대 다음 코드를...

/*  const found = alertForMiscreant(people);

    다음과 같이 바꾼다.

    const found = findMiscreant(people);
    alertForMiscreant(people); */

// 4. 이제 원래의 변경 함수에서 질의 관련 코드를 없앤다.
{
    function alertForMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                setOffAlarms();
                return; // 수정
            }
            if (p === "Choi") {
                setOffAlarms();
                return; // 수정
            }
        }
        return; // 수정
    }

    function findMiscreant(people) {
        for (const p of people) {
            if (p === "Kim") {
                return "Kim";
            }
            if (p === "Choi") {
                return "Choi";
            }
        }
        return "";
    }
}

// 5. 더 가다듬기
// 변경 함수와 새 질의 함수에는 중복된 코드가 많아 보인다.
// 이번 경우엔 변경 함수에서 질의함수를 사용하도록 고치면 해결된다. (알고리즘 교체하기 7.9절 적용)
export function findMiscreant(people, alarm) {
    for (const p of people) {
        if (p === "Kim") {
            return "Kim";
        }
        if (p === "Choi") {
            return "Choi";
        }
    }
    return "";
}

export function alertForMiscreant(people, alarm) {
    const miscreant = findMiscreant(people, alarm);
    if (miscreant !== "") setOffAlarms(alarm, miscreant);
}

function setOffAlarms(alarm, p) {
    alarm.setOff("Found Miscreant " + p);
}
