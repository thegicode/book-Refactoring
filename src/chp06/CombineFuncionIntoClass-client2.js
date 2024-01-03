import {
    aquireReading,
    Reading,
    taxThreshold,
} from "../../src/chp06/CombineFuncionIntoClass.js";

// const aReading = aquireReading();
// const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
// const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

const rawReading = aquireReading();
const aReading = new Reading(rawReading);
export const taxableCharge = aReading.taxableCharge;
