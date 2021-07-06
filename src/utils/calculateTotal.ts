export const totalCost = (arr: any[]) => {
    if (arr.length === 0) return '';
    let result = arr?.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
    );

    return `${result} Naira`;
}
