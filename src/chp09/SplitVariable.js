// 해기스라는 음식이 다른 지역으로 전파된 거리를 구하는 코드

function distanceTravelled(scenario, time) {
    let result;
    let acc = scenario.primaryForce / scenario.mass; // 가속도(a) = 힘(F) / 질량(m)
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * acc * primaryTime * primaryTime; // 전파된 거리
    let secondaryTime = time - scenario.delay;
    // 두 번째 힘을 반영해 다시 계산
    if (secondaryTime > 0) {
        let primaryVelocity = acc * scenario.delay;
        acc = (scenario.primaryForce + scenario.scondaryFoce) / scenario.mass;
        result +=
            primaryVelocity * secondaryTime +
            0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}

// acc 변수에 값이 두 번 대입된다. -> 역할이 두 개라는 신호
// 하나는 첫 번째 힘이 유발한 초기 가속도를 저장하는 역할이고,
// 다른 하나는 두 번쨰 힘까지 반영된 후의 가속도를 저장하는 역할
// 쪼개야 할 변수다.

function distanceTravelled_1(scenario, time) {
    let result;
    let primaryAcceleration = scenario.primaryForce / scenario.mass; // 1, 2
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * primaryAcceleration * primaryTime * primaryTime; // 3
    let secondaryTime = time - scenario.delay;
    // 두 번째 힘을 반영해 다시 계산
    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay; // 3
        let acc =
            (scenario.primaryForce + scenario.scondaryFoce) / scenario.mass; // 4
        result +=
            primaryVelocity * secondaryTime +
            0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}
