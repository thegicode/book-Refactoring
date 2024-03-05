/**
 *  11.6 질의 함수를 매개변수로 바꾸기 Replace Query with Parameter
 * 실내온도 제어 시스템
 * 사용자는 온도조절기 thermostat로 온도를 설정할 수 있지만, 목표 온도는 난방 계획에서 정한 범위에서만 선택할 수 있다.
 */

{
    class HeatingPlan {
        constructor(max, min) {
            this._max = max;
            this._min = min;
        }

        get targetTemperature() {
            if (thermostat.selectedTemperature > this._max) return this._max;
            else if (thermostat.selectedTemperature < this._min)
                return this._min;
            else return thermostat.selectedTemperature;
        }
    }

    // 호출자
    if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
    else if (thisPlan.targetTemperature < thermostat.currentTemperature)
        setToCool();
    else setOff();
}

// targetTemperature() 메서드가 전역 객체인 thermostat에 의존한다는 데 신경이 쓰인다.
// 그러니 이 전역 객체에 건네는 질의 메서드를 매개변수로 옮겨서 의존성을 끊어보자.

// 1. 첫 번째로 할 일은 변수 추출하기(6.3절)를 이용하여 이 메서드에서 사용할 매개변수를 준비하는 것이다.

{
    class HeatingPlan {
        constructor(max, min) {
            this._max = max;
            this._min = min;
        }

        get targetTemperature() {
            const selectedTemperature = thermostat.selectedTemperature;
            if (selectedTemperature > this._max) return this._max;
            else if (selectedTemperature < this._min) return this._min;
            else return selectedTemperature;
        }
    }
}

// 2. 이제 배개변수의 값을 구하는 코드를 제외한 나머지를 메서드로 추출(6.1절)하기가 한경 수월해졌다.
{
    class HeatingPlan {
        constructor(max, min) {
            this._max = max;
            this._min = min;
        }

        get targetTemperature() {
            const selectedTemperature = thermostat.selectedTemperature;
            return this.xxNEWTargetTemperature(selectedTemperature);
        }

        xxNEWTargetTemperature(selectedTemperature) {
            if (selectedTemperature > this._max) return this._max;
            else if (selectedTemperature < this._min) return this._min;
            else return selectedTemperature;
        }
    }
}

// 다음으로 방금 추출한 변수를 인라인(6.4절)하면 원래 메서드에는 단순한 호출만 남게 된다.
{
    class HeatingPlan {
        constructor(max, min) {
            this._max = max;
            this._min = min;
        }

        get targetTemperature() {
            return this.xxNEWTargetTemperature(thermostat.selectedTemperature);
        }

        xxNEWTargetTemperature(selectedTemperature) {
            if (selectedTemperature > this._max) return this._max;
            else if (selectedTemperature < this._min) return this._min;
            else return selectedTemperature;
        }
    }
}

// 이이서 이 메서드까지 인라인(6.2절)한다.
{
    class HeatingPlan {
        constructor(max, min) {
            this._max = max;
            this._min = min;
        }

        get targetTemperature() {
            return this.xxNEWTargetTemperature(thermostat.selectedTemperature);
        }

        xxNEWTargetTemperature(selectedTemperature) {
            if (selectedTemperature > this._max) return this._max;
            else if (selectedTemperature < this._min) return this._min;
            else return selectedTemperature;
        }
    }

    // 호출자
    if (
        thePlan.xxNEWTargetTemperature(thermostat.selectedTemperature) >
        thermostat.currentTemperature
    )
        setToHeat();
    else if (
        thisPlan.xxNEWTargetTemperature(thermostat.selectedTemperature) <
        thermostat.currentTemperature
    )
        setToCool();
    else setOff();
}

// 이제 새 메서드의 이름을 원래 메서드의 이름으로 바꿀 차례다.
// 앞서 이 메서드의 이름을 검색하기 쉽게 만들어놓은 덕에 쉽게 바꿀 수 있다.
{
    class HeatingPlan {
        constructor(max, min) {
            this._max = max;
            this._min = min;
        }

        targetTemperature(selectedTemperature) {
            if (selectedTemperature > this._max) return this._max;
            else if (selectedTemperature < this._min) return this._min;
            else return selectedTemperature;
        }
    }

    // 호출자
    if (
        thePlan.targetTemperature(thermostat.selectedTemperature) >
        thermostat.currentTemperature
    )
        setToHeat();
    else if (
        thisPlan.targetTemperature(thermostat.selectedTemperature) <
        thermostat.currentTemperature
    )
        setToCool();
    else setOff();
}
