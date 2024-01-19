export class Account {
    constructor(AccountType, daysOverdrawn) {
        this.type = AccountType;
        this._daysOverdrawn = daysOverdrawn;
    }

    // 은행 이자 계산
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge();
        return result;
    }

    // 위임 메서드
    overdraftCharge() {
        return this.type.overdrafrtCharge(this.daysOverdrawn);
    }

    get daysOverdrawn() {
        return this._daysOverdrawn;
    }
}

export class AccountType {
    constructor(type) {
        this._type = type;
    }

    get isPremium() {
        return this._type === "Premium";
    }

    // 초과 인출 이자 계산
    overdrafrtCharge(daysOverdrawn) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (daysOverdrawn <= 7) return baseCharge;
            else return baseCharge + (daysOverdrawn - 7) * 0.85;
        } else return daysOverdrawn * 1.75;
    }
}
