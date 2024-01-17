export function trackSummary(points) {
    const totalTime = calculateTime();
    const pace = totalTime / 60 / totalDistance(points);
    return {
        time: totalTime,
        distance: totalDistance(points),
        pace: pace,
    };

    // 총 시간 계산
    function calculateTime() {
        return 10000;
    }
}

// 총 거리 계산
function totalDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}

// 두 지점의 거리 계산
function distance(p1, p2) {
    // haversine formula see http://www.movable-type.co.uk/scripts/latlong.html
    const EARTH_RADIUS = 3959; // in miles
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(radians(p2.lat)) *
            Math.cos(radians(p1.lat)) *
            Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
}

// 라디안 값으로 변환
function radians(degrees) {
    return (degrees * Math.PI) / 180;
}
