/**
 * 11.4 객체 통째로 옮기기 Preserve Whole Object 2
 * 실내온도 모니터링 시스템
 * 일일 최저∙최고 기온이 난방 계획 heating plan에서 정한 범위를 벗어나는지 확인
 */

{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        const low = aRoom.daysTempRange.low;
        const high = aRoom.daysTempRange.high;
        if (!aPlan.withinRange(low, high))
            alerts.push("room temperature went outside range");
        return alerts;
    }

    class HeatingPlan {
        constructor(temperaturRange) {
            this._temperaturRange = temperaturRange;
        }

        withinRange(bottom, top) {
            return (
                bottom >= this._temperaturRange.low &&
                top <= this._temperaturRange.high
            );
        }
    }
}

// 이번에는 코드를 재정렬해서 기존 코드 일부를 메서드로 추출하는 방식으로 새 메서드를 만들려 한다.
// 지금의 호출자 코드는 이에 적합하지 않지만 변수 추출하기 6.3절 를 몇 번 적용하면 원하는 모습으로 둔갑한다.
// 먼저, 조건문에서 기존 메서드를 호출하는 코드들을 해방시켜보자.

{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        const low = aRoom.daysTempRange.low;
        const high = aRoom.daysTempRange.high;
        const isWithinRange = aPlan.withinRange(low, high);
        if (!isWithinRange) alerts.push("room temperature went outside range");
        return alerts;
    }

    class HeatingPlan {
        constructor(temperaturRange) {
            this._temperaturRange = temperaturRange;
        }

        withinRange(bottom, top) {
            return (
                bottom >= this._temperaturRange.low &&
                top <= this._temperaturRange.high
            );
        }
    }
}

// 그런 다음 입력 매개변수를 추출한다.

{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        const tempRange = aRoom.daysTempRange;
        const low = tempRange.low;
        const high = tempRange.high;
        const isWithinRange = aPlan.withinRange(low, high);
        if (!isWithinRange) alerts.push("room temperature went outside range");
        return alerts;
    }

    class HeatingPlan {
        constructor(temperaturRange) {
            this._temperaturRange = temperaturRange;
        }

        withinRange(bottom, top) {
            return (
                bottom >= this._temperaturRange.low &&
                top <= this._temperaturRange.high
            );
        }
    }
}

// 다 끝났으면 함수 추출하기 6.1절로 새 메서드를 만들 수 있다.

{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        const tempRange = aRoom.daysTempRange;
        const low = tempRange.low;
        const high = tempRange.high;
        const isWithinRange = xxNEWwithinRange(low, high);
        if (!isWithinRange) alerts.push("room temperature went outside range");
        return alerts;
    }

    function xxNEWwithinRange(aPlan, tempRange) {
        const low = tempRange.low;
        const high = tempRange.high;
        const isWithinRange = aPlan.withinRange(low, high);
        return isWithinRange;
    }

    class HeatingPlan {
        constructor(temperaturRange) {
            this._temperaturRange = temperaturRange;
        }

        withinRange(bottom, top) {
            return (
                bottom >= this._temperaturRange.low &&
                top <= this._temperaturRange.high
            );
        }
    }
}

// 원래 메서드는 다른 컨텍스트(HeadingPlan 클래스 안)에 있으니 함수 옮기기를 수행햐야 한다.

{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        const tempRange = aRoom.daysTempRange;

        const isWithinRange = aPlan.withinRange(tempRange);
        if (!isWithinRange) alerts.push("room temperature went outside range");

        return alerts;
    }

    class HeatingPlan {
        constructor(temperaturRange) {
            this._temperaturRange = temperaturRange;
        }

        withinRange(tempRange) {
            return (
                tempRange.low >= this._temperatureRange.low &&
                tempRange.high <= this._temperatureRange.high
            );
        }
    }
}
