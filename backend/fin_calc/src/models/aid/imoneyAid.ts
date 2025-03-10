import IMoney from "../interfaces/IMoney.ts";
import MyDinero from "../entities/myDinero.ts";
import { InvalidArgumentError } from "../../Exceptions/operations.execption.ts";

export default class IMoneyAid{
    public static getImoney(
    num: number, isConverted:boolean=false, currency:string="BRL",precision:number=2,locale:string="pt-BR"
): IMoney {
        num = IMoneyAid.getIntFromString(num.toFixed(precision))
        return new MyDinero(num, isConverted, currency, locale, precision)
    }

    public static isFloat = (num: number): boolean => num % 1 !== 0 

    /**
     * Return the int number to a float string or a NaN.
     * Note that it does not convert to cent, just to int.
     * @param toFixedNumber The amount converted by the precision
     * @returns a int number
     * @returns a Nan - In case of failed
     */
    public static getIntFromString(toFixedNumber: string) : number {
        let num: number
        if (toFixedNumber.includes(".")){
            const strArr: string[] = toFixedNumber.split('.')
            num = parseInt(`${strArr[0]}${strArr[1]}`);
        }else{
            num = parseInt(toFixedNumber)
        }
        return num
    }

    public static getCentsFromFloat = (float:number, precision:number) => IMoneyAid.getIntFromString(float.toFixed(precision))
}