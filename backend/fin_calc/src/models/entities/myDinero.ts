import dinero from "../../dependencies/number.deps.ts";
import IMoney from "../interfaces/IMoney.ts";
import InvalidArgumentError from "../../Exceptions/operations.execption.ts";
import DivideByZeroError from "../../Exceptions/math.exceptions.ts"

export default class MyDinero implements IMoney {
    public din: any;

    constructor(value: number,currency: string = 'BRL', locale: string = 'pt-BR', precision: number = 20) {
        if (isNaN(value)) throw new InvalidArgumentError("Não é permitido iniciar MyDinero com valores não numéricos.")

        value = value*100;
        this.din = dinero({ amount: value, currency, locale, precision });
    }

    getAmount(): number {
        return this.din.getAmount();
    }

    getValue(): number {
        return this.din.getAmount()/(100*100);
    }

    

    getCurrency(): string {
        return this.din.getCurrency();
    }

    getLocale(): string {
        return this.din.getLocale();
    }

    getPrecision(): number {
        return this.din.getPrecision();
    }

    equalsTo(other: IMoney): boolean {
        return this.din.equalsTo(other.getInstance());
    }

    lessThan(other: IMoney): boolean {
        return this.din.lessThan(other.getInstance());
    }

    lessThanOrEqual(other: IMoney): boolean {
        return this.din.lessThanOrEqual(other.getInstance());
    }

    greaterThan(other: IMoney): boolean {
        return this.din.greaterThan(other.getInstance());
    }

    greaterThanOrEqual(other: IMoney): boolean {
        return this.din.greaterThanOrEqual(other.getInstance());
    }

    isZero(): boolean {
        return this.din.isZero();
    }

    isPositive(): boolean {
        return this.din.isPositive();
    }

    isNegative(): boolean {
        return this.din.isNegative();
    }

    hasSubUnits(): boolean {
        return this.din.hasSubUnits();
    }

    hasSameCurrency(other: IMoney): boolean {
        return this.din.hasSameCurrency(other.getInstance());
    }

    hasSameAmount(other: IMoney): boolean {
        return this.din.hasSameAmount(other.getInstance());
    }

    setLocale(locale: string): void {
        this.din.setLocale(locale);
    }

    toFormat(format:string = 'R$ 0,0.00'): string {
        return this.din.toFormat(format);
    }

    toReal(): string {
        return `R$${this.getValue().toFixed(2)}`;
    }

    toUnit(): number {
        return this.din.toUnit();
    }

    toRoundedUnit(): number {
        return this.din.toRoundedUnit();
    }

    toObject(): object {
        return this.din.toObject();
    }

    toJSON(): string {
        return this.din.toJSON();
    }

    convertPrecision(precision: number): IMoney {
        return new MyDinero(this.din.convertPrecision(precision).getAmount());
    }

    normalizePrecision(): IMoney {
        return new MyDinero(this.din.normalizePrecision().getAmount());
    }

    getInstance(): typeof dinero {
        return this.din;
    }

    sum(other: IMoney): IMoney {
        return this.din.add(other.getInstance());
    }

    subtract(other: IMoney): IMoney {
        return this.din.subtract(other.getInstance());
    }

    multiply(factor: number): IMoney {
        return this.din.multiply(factor);
    }

    divide(divisor: number): IMoney {
        if (divisor === 0) throw new DivideByZeroError("Divisão por zero não é permitida.");
        return this.din.divide(divisor);
    }

}
