export function priceOrder(product, quantity, shippingMethod) {
    const pirceData = calculatePricdingData(product, quantity);
    return applyShipping(pirceData, shippingMethod);
}

function calculatePricdingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount =
        Math.max(quantity - product.discountThreshold, 0) *
        product.basePrice *
        product.discountRate;
    return { basePrice, quantity, discount };
}

function applyShipping(pirceData, shippingMethod) {
    const shippingPerCase =
        pirceData.basePrice > shippingMethod.discountThreshold
            ? shippingMethod.discountedFee
            : shippingMethod.feePerCase;
    const shippingCost = pirceData.quantity * shippingPerCase;
    return pirceData.basePrice - pirceData.discount + shippingCost;
}
