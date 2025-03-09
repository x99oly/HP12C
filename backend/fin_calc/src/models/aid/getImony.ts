import IMoney from "../interfaces/IMoney.ts";
import MyDinero from "../entities/myDinero.ts";

export default class IMoneyAid{
    public static getImoney(num: number): IMoney {
        return new MyDinero(num)
    }

    public static isFloat = (num: number): boolean => num % 1 !== 0 
}