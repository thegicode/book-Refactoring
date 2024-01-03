import {
    aquireReading,
    Reading,
} from "../../src/chp06/CombineFuncionIntoClass.js";

// const aReading = aquireReading();
// const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

const rawReading = aquireReading();
const aReading = new Reading(rawReading);
export const baseCharge = aReading.baseCharge;
