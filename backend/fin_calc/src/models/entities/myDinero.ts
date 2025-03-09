import dinero from "../../dependencies/number.deps.ts";
import IMoney from "../interfaces/IMoney.ts";
import {InvalidArgumentError} from "../../Exceptions/operations.execption.ts";
import DivideByZeroError from "../../Exceptions/math.exceptions.ts"
import { Z_ASCII } from "node:zlib";

export default class MyDinero implements IMoney {
    public din: any;
    private format: string = '$0,0.00'
    private uuid: string

    constructor(value: number, isConverted: boolean = false, currency: string = 'BRL', locale: string = 'pt-BR', precision: number = 2) {
        if (typeof value !== 'number' || isNaN(value)) throw new InvalidArgumentError("Não é permitido iniciar MyDinero com valores não numéricos.")
        
        if (!isConverted) value = value*100;

        this.uuid = crypto.randomUUID()
        this.din = dinero({ amount: value, currency, precision });
        this.din.setLocale(locale)
    }

    getIMoney(num: number): IMoney {
      return new MyDinero(num)
    }

    setFormat(format:string){
        this.format = format
    }

    getAmount(): number {
        return this.din.getAmount();
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
        return this.getID() === other.getID();
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

    toFormat(): string {
        return this.din.toFormat(this.format);
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
        return new MyDinero(this.din.add(other.getInstance()).getAmount(), true);
    }

    subtract(other: IMoney): IMoney {
        return new MyDinero(this.din.subtract(other.getInstance()).getAmount(), true);
    }

    multiply(factor: number): IMoney {
        return new MyDinero(this.din.multiply(factor).toUnit(), false);
    }

    divide(divisor: number): IMoney {
        if (divisor === 0) throw new DivideByZeroError();
        return new MyDinero(this.din.divide(divisor).getAmount(), true);
    }

    toString(): string {
      const definition: string[] = []
      definition.push(`total: ${this.toFormat()}`)
      definition.push(`valor: ${this.toUnit()}`)
      definition.push(`moeda: ${this.getCurrency()}`)
      definition.push(`regionalização: ${this.getLocale()}`)
      return definition.join(' | ')
    }

    getID = (): string => this.uuid;

}
