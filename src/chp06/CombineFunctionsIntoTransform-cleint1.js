import {
    acquireReading,
    enrichReading,
} from "./CombineFunctionsIntoTransform.js";

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);

// 기본요금
const baseCharge = aReading.baseCharge;
