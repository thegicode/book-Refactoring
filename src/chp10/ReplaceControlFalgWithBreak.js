/**
 * 10.7 Replace Control Falg with Break
 * 사람 목록을 훑으면서 악당을 찾는 코드
 * 악당 이름은 하드코딩
 */

{
    let found = false;
    for (const p of people) {
        if (!found) {
            if (p === "조커") {
                sendAlert();
                found = true;
            }
            if (p === "샤루만") {
                sendAlert();
                found = true;
            }
        }
    }
}

/**
 * 1. 여기서 제어 플래그는 found 변수이고, 제어 흐름을 변경하는 데 쓰인다.
 * 이처럼 정리해야할 코드양이 제법 된다면 가장 먼저 함수 추출하기를 활용해서 서로 밀접한 코드만 담은 함수를 뽑아내자.
 */

{
    checkForMiscreants(people);

    function checkForMiscreants(people) {
        let found = false;
        for (const p of people) {
            if (!found) {
                if (p === "조커") {
                    sendAlert();
                    found = true;
                }
                if (p === "샤루만") {
                    sendAlert();
                    found = true;
                }
            }
        }
    }
}

/**
 * 2. 제어 플래그가 참이면 반복문에서는 더 이상 할 일이 없다.
 * break문으로 반복문에서 벗어나거나 return을 써서 아예 빠져나오면 된다.
 * 이 함수에서는 더 할 일이 없으니 return을 사용
 * 언제나 작은 단계로 나눠 진행할 것이다. 가장 먼저 return문을 넣은 후 테스트해보자.
 */

{
    checkForMiscreants(people);

    function checkForMiscreants(people) {
        let found = false;
        for (const p of people) {
            if (!found) {
                if (p === "조커") {
                    sendAlert();
                    return;
                }
                if (p === "샤루만") {
                    sendAlert();
                    found = true;
                }
            }
        }
    }
}

/**
 * 3. 제어 플러그가 갱신되는 장소를 모두 찾아서 같은 과정을 반복한다.
 */

{
    checkForMiscreants(people);

    function checkForMiscreants(people) {
        let found = false;
        for (const p of people) {
            if (!found) {
                if (p === "조커") {
                    sendAlert();
                    return;
                }
                if (p === "샤루만") {
                    sendAlert();
                    return;
                }
            }
        }
    }
}

/**
 * 4. 갱신 코드를 모두 제거했다면 제어 플래그를 참조하는 다른 코드도 모두 제거한다.
 */

{
    checkForMiscreants(people);

    function checkForMiscreants(people) {
        for (const p of people) {
            if (p === "조커") {
                sendAlert();
                return;
            }
            if (p === "샤루만") {
                sendAlert();
                return;
            }
        }
    }
}

/**
 * 5. 더 가다듬기
 */

checkForMiscreants(people);

function checkForMiscreants(people) {
    if (people.some((p) => ["조커", "사루만"].includes(p))) sendAlert();
}
