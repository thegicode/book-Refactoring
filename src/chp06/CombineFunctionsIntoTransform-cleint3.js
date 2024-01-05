import {
    acquireReading,
    // calculateBaseCharge,
    enrichReading,
} from "./CombineFunctionsIntoTransform.js";

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
// const baseicChargeAmount = calculateBaseCharge(aReading);
const baseicChargeAmount = aReading.baseCharge;
