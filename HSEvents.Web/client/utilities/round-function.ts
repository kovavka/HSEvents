
export class RoundFunction {
    public static round(value: number, exp: number): number {
        // Сдвиг разрядов
        var num = value + 'e' + exp;
        value = Math.round(+(num));
        // Обратный сдвиг
        num = value + 'e' + (-exp);
        return +(num);
    }

    public static toWhole(value: number): number {
        return this.round(value, 0);
    }

    public static roundStr(value: number, exp: number): string {
        return this.round(value, exp).toFixed(exp);
    }
}