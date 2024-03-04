/**
 * 11.4 객체 통째로 옮기기 Preserve Whole Object
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

//  최저∙최고 기온을 뽑아내어 인수로 건네는 대신 범위 객체를 통째로 건넬 수도 있다.
// 1. 가장 먼저 원하는 인터페이스를 갖춘 빈 메서드를 만든다.

{
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

        xxNEWwithinRange(aNumberRnage) {
            //
        }
    }
}
// 이 메서드로 기존 withinRange() 메서드를 대체할 생각이다.
// 그래서 똑같은 이름을 쓰되, 나중에 찾아 바꾸기 쉽도록 적당한 접두어만 붙여뒀다.

// 2. 새 메서더의 본무은 기존 withinRange()를 호출하는 코드로 채운다.
// 자연스럽게 새 매개변수를 기존 매개변수와 매핑하는 로직이 만들어진다.

{
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

        xxNEWwithinRange(aNumberRnage) {
            return this.withinRange(aNumberRnage.low, aNumberRnage.high);
        }
    }
}

// 4. 기존 함수를 호출하는 코드를 찾아서 새 함수를 호출하게 수정하자.

{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        const low = aRoom.daysTempRange.low;
        const high = aRoom.daysTempRange.high;
        if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
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

        xxNEWwithinRange(aNumberRnage) {
            return this.withinRange(aNumberRnage.low, aNumberRnage.high);
        }
    }
}

// 4. 수정하고 나면 기존 코드 중 더는 필요 없는 부분이 생길 수 있다. 죽은 코드이니 제거한다.
{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
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

        xxNEWwithinRange(aNumberRnage) {
            return this.withinRange(aNumberRnage.low, aNumberRnage.high);
        }
    }
}

// 5. 모두 새 함수로 대체했다면 원래 함수를 인라인해준다.
{
    function temperatureAlerts(aRoom, aPlan) {
        const alerts = [];
        if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
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

        xxNEWwithinRange(aNumberRnage) {
            return (
                aNumberRnage.low >= this._temperaturRange.low &&
                aNumberRnage.high <= this._temperaturRange.high
            );
        }
    }
}

// 6 새 함수에서 보기 흉한 접두어를 제거하고 호출자들에도 모두 반영한다.
export function temperatureAlerts(aRoom, aPlan) {
    const alerts = [];
    if (!aPlan.withinRange(aRoom.daysTempRange))
        alerts.push("room temperature went outside range");
    return alerts;
}

export class HeatingPlan {
    constructor(temperaturRange) {
        this._temperaturRange = temperaturRange;
    }

    withinRange(aNumberRnage) {
        return (
            aNumberRnage.low >= this._temperaturRange.low &&
            aNumberRnage.high <= this._temperaturRange.high
        );
    }
}
