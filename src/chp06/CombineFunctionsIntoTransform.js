import _ from "lodash";

const reading = {
    customer: "ivan",
    quantity: 10,
    month: 5,
    year: 2017,
};

export function acquireReading() {
    return reading;
}

export function taxThreshold() {
    return 0.1;
}

export function baseRate(month, year) {
    if (year === 2017 && month === 5) return 0.1;
    return 0.2;
}

export function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

export function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.texableCharge = Math.max(
        0,
        result.baseCharge - taxThreshold(result.year)
    );
    return result;
}
