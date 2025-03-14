import dinero from "../../dependencies/number.deps.ts";
import IMoney from "../interfaces/IMoney.ts";
import {InvalidArgumentError} from "../../Exceptions/operations.execption.ts";
import DivideByZeroError from "../../Exceptions/math.exceptions.ts"
import IMoneyAid from "../aid/imoneyAid.ts";

export default class MyDinero implements IMoney {
    public din: any;
    private format: string = '$0,0.00'
    private uuid: string

    constructor(
        value: number, isConverted: boolean = false, currency: string = 'BRL',
         locale: string = 'pt-BR', precision: number = 2) {
        if (typeof value !== 'number' || isNaN(value)) throw new InvalidArgumentError("Não é permitido iniciar MyDinero com valores não numéricos.")
        
        if (!isConverted) 
            value = IMoneyAid.getIntFromString(value.toFixed(precision))

        this.uuid = crypto.randomUUID()
        this.din = dinero({ amount: value, currency, precision });
        this.din.setLocale(locale)
    }

    percentagem(percent:number): number {
        if (percent < 0 || percent > 100)
            throw new InvalidArgumentError("O valor percentual deve estar contido entre 0 e 100.")
        return (this.getAmount() * (percent/100))/100
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

    setLocale(locale: string): void {
        this.din.setLocale(locale);
    }

    toFormat(): string {
        return this.din.toFormat(this.format);
    }

    toUnit(): number {
        return this.din.toUnit();
    }

    convertPrecision(precision: number): number {
        return this.din.convertPrecision(precision);
    }

    getScalePrecision(): number {
      return Math.pow(10, this.getPrecision())
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
        return new MyDinero(this.din.multiply(factor).getAmount(), true);
    }

    divide(divisor: number): IMoney {
        if (divisor === 0) throw new DivideByZeroError();
        return new MyDinero(this.din.divide(divisor).getAmount(), true);
    }

    toJSON(): object {
      return {
        "total" : this.toFormat(),
        "valor" : this.toUnit(),
        "moeda" : this.getCurrency(),
        "regionalização" : this.getLocale(),
        "precisão" : this.getScalePrecision()
    }
    
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
