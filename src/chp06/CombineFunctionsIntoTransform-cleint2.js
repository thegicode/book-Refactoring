import { taxThreshold } from "./CombineFuncionIntoClass.js";
import {
    acquireReading,
    taxThreshold,
    enrichReading,
} from "./CombineFunctionsIntoTransform.js";

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);

// 기본요금
// const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
// const base = aReading.baseCharge;

// 세금을 부과할 소비량을 계산하는 코드
// const taxableCharge = Math.max(
//     0,
//     aReading.baseCharge - taxThreshold(aReading.year)
// );
const taxableCharge = aReading.taxableCharge;
