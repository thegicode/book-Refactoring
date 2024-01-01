export function price(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quanityDiscount =
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shippingCost = Math.min(basePrice * 0.1, 100);
    return basePrice - quanityDiscount + shippingCost;
}
