import {
    aquireReading,
    Reading,
} from "../../src/chp06/CombineFuncionIntoClass.js";

// const rawReading = aquireReading();
// const aReading = new Reading(rawReading);
// const baseChargeAmount = aReading.baseCharge;

const rawReading = aquireReading();
const aReading = new Reading(rawReading);
export const basicChargeAmount = aReading.baseCharge;
