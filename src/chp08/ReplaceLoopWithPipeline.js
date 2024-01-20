// 회사의 지점 사무실 정보를 CSV 형태로 받아
// India에 자리한 사무실을 찾아서 도시명과 전화번호를 반환

/* export function acquireData(input) {
    const lines = input.split("\n"); // 컬렉션
    let firstLine = true;
    const result = [];
    // 반복문
    for (const line of lines) {
        if (firstLine) {
            firstLine = false;
            continue;
        }

        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }

    return result;
}
 */

/* // 1. 반복문에서 사용하는 컬렉션을 가리키는 별도 변수를 새로 만든다.
export function acquireData(input) {
    const lines = input.split("\n");
    let firstLine = true;
    const result = [];
    const loopItems = lines; // loop variable(루프 변수)
    for (const line of loopItems) {
        if (firstLine) {
            firstLine = false;
            continue;
        }

        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }

    return result;
}
 */

// 2. 반복문에서 첫 if문은  데이터의 첫 줄을 건너띄는 역할.
// 이 작업은 slice() 연산으로 수행하고 반복문 나의 if문은제거
/* export function acquireData(input) {
    const lines = input.split("\n");
    // let firstLine = true;
    const result = [];
    // const loopItems = lines;
    const loopItems = lines.slice(1);
    for (const line of loopItems) {
        // if (firstLine) {
        //     firstLine = false;
        //     continue;
        // }

        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }

    return result;
}
 */

// 3. 빈 줄 지우기(trim)
// filter() 연산으로 대체
/* export function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    // const loopItems = lines.slice(1);
    const loopItems = lines.slice(1).filter((line) => line.trim() !== "");
    for (const line of loopItems) {
        // if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }

    return result;
}
 */

// 4. map() 연산을 사용해 여러 줄짜리 CSV 데이터를 문자열 배열로 변환한다.
/* export function acquireData(input) {
    const lines = input.split("\n");
    const result = [];

    // const loopItems = lines.slice(1).filter((line) => line.trim() !== "");
    const loopItems = lines
        .slice(1)
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(","));

    for (const line of loopItems) {
        // const record = line.split(",");
        const record = line;
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }

    return result;
} */

// 5. filter() 연산을 수행하여 인도에 위치한 사무실 레코드를 뽑아낸다.
/* export function acquireData(input) {
    const lines = input.split("\n");
    const result = [];

    // const loopItems = lines
    //     .slice(1)
    //     .filter((line) => line.trim() !== "")
    //     .map((line) => line.split(","));
    const loopItems = lines
        .slice(1)
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(","))
        .filter((record) => record[1].trim() === "India");


    for (const line of loopItems) {
        const record = line;
        // if (record[1].trim() === "India") {
        result.push({ city: record[0].trim(), phone: record[2].trim() });
        // }
    }

    return result;
} */

// 6. map()을 사용해 결과 레코드를 생성한다.
/* export function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(","))
        .filter((record) => record[1].trim() === "India")
        .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));

    for (const line of loopItems) {
        // const record = line;
        // result.push({ city: record[0].trim(), phone: record[2].trim() });
        result.push(line);
    }

    return result;
}
 */

// 7. 반복문이 하는 일은 이제 하나만 남았다. 바로 결과를 누적변수에 추가하는 일이다.
// 파이프라인의 결과를 누적 변ㄴ수에 대입해주면 이 코드도 제거할 수 있다.
/* export function acquireData(input) {
    const lines = input.split("\n");
    // const result = [];
    const result = lines
        .slice(1)
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(","))
        .filter((record) => record[1].trim() === "India")
        .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));

    // for (const line of loopItems) {
    //     result.push(line);
    // }

    return result;
} */

// 8. 더 가다듬기
// result 변수를 인라인
// lines도 인라인할까 생각했지만, 그대로 두는 편이 코드가 수행하는 일을 더 잘 설명해준다고 판단하여 그대로 뒀다.
export function acquireData(input) {
    const lines = input.split("\n");
    return lines
        .slice(1)
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(","))
        .filter((record) => record[1].trim() === "India")
        .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));
}
