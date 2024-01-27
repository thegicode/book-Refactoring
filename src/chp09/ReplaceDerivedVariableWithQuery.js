import { assert } from "chai";

export class ProductionPlan {
    constructor() {
        this._adjustments = [];
        this._production = 0;
    }

    get production() {
        return this._production;
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 조정 값 adjustment를 적용하는 과정에서 직접 관련이 없는 누적 값 production까지 갱신했다.
// 그런데 이 누적 값은 매번 갱신하지 않고도 계산할 수 있다.

// 1. 신중..assertion을 추가하여 검증
export class ProductionPlan_1 {
    constructor() {
        this._adjustments = [];
        this._production = 0;
    }

    get production() {
        assert(this._production === this.calculateProduction);
        return this._production;
    }

    get calculateProduction() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 2. 테스트 -> 어서션이 실패하지 않으면 필드를 반환하던 코드를 수정하여 계산 결과를 직접 반환하도록 한다.
export class ProductionPlan_2 {
    constructor() {
        this._adjustments = [];
        this._production = 0;
    }

    get production() {
        return this.calculateProduction;
    }

    get calculateProduction() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 3. calculateProduction() 메서드를 인라인한다.
export class ProductionPlan_3 {
    constructor() {
        this._adjustments = [];
        this._production = 0;
    }

    get production() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 4. 옛 변수를 참조하는 모든 모드를 죽은 코드 제거하기로 정리한다.
export class ProductionPlan_4 {
    constructor() {
        this._adjustments = [];
    }

    get production() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
    }
}
