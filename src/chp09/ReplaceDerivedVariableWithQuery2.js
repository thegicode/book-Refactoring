import { assert } from "chai";

export class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }

    get production() {
        return this._production;
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 1
// 어서션 코드를 앞의 예와 똑같이 작성한다면 _production의 초깃값이 0이 아니면 실패하고 만다.
// 앞에서와의 차이라면 변수 쪼개기를 먼저 적용하는 것뿐이다.
export class ProductionPlan_1 {
    constructor(production) {
        this._initialProduction = production;
        this._productionAccumulator = 0;
        this._adjustments = [];
    }

    get production() {
        return this._initialProduction + this._productionAccumulator;
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._productionAccumulator += anAdjustment.amount;
    }
}

// 2. 어서션 추가
export class ProductionPlan_2 {
    constructor(production) {
        this._initialProduction = production;
        this._productionAccumulator = 0;
        this._adjustments = [];
    }

    get production() {
        assert(
            this._productionAccumulator === this.calculateProductionAccumulator
        );
        return this._initialProduction + this._productionAccumulator;
    }

    get calculateProductionAccumulator() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._productionAccumulator += anAdjustment.amount;
    }
}

// 3 이전과 거의 같다. 다만 이번에는 calculateProductionAccumulator()를 인라인 하지 않고 속성으로 남겨두는 편이 나아 보인다.
export class ProductionPlan_3 {
    constructor(production) {
        this._initialProduction = production;
        this._adjustments = [];
    }

    get production() {
        return this._initialProduction + this.calculateProductionAccumulator;
    }

    get calculateProductionAccumulator() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
    }
}
