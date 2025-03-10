import IMoney from "../interfaces/IMoney.ts";
import MyDinero from "../entities/myDinero.ts";

export default class IMoneyAid{
    public static getImoney(
    num: number, isConverted:boolean=false, currency:string="BRL",precision:number=2,locale:string="pt-BR"
): IMoney {
        return new MyDinero(num, isConverted, currency, locale, precision)
    }

    public static isFloat = (num: number): boolean => num % 1 !== 0 
}