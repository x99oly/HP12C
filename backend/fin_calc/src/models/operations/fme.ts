import { basename } from "node:path";
import IFme from "../interfaces/IFme.ts";
import IMoney from "../interfaces/IMoney.ts";
import IMoneyAid from "../aid/getImony.ts";

export default class Fme implements IFme {    

    sum = (addend: IMoney, adder: IMoney): IMoney => addend.sum(adder)

    subtract = (addend: IMoney, adder: IMoney): IMoney => addend.subtract(adder)

    multiply = (addend: IMoney, count: number): IMoney => addend.multiply(count)

    divide = (addend: IMoney, count: number): IMoney => addend.divide(count)

    // powerOf = (base: IMoney, exponent: number): IMoney => {
    //     let num: number = base.getAmount() ** exponent
    //     if (IMoneyAid.isFloat(num)){
    //         const numStr: string = num.toString()
    //         const numStrArr: string[] = numStr.split(".")
    //         let decHouses: number = numStrArr[1].length
    //         const dec: number = () => {
    //             let str: string = ''
    //             while(decHouses > 0){
    //                 str += '0'
    //                 decHouses--
    //             }
    //             str = '1'+str
    //             return parseInt(str)
    //         }
    //         num = num * dec
    //     }
    //     return IMoneyAid.getImoney(num)
    // }

    sumArr = (moneyArr: IMoney[]): IMoney => {
        let zero: IMoney = moneyArr[0]
        moneyArr.forEach( e => {
            if (!e.equalsTo(zero)){
                zero = this.sum(zero, e)
            }
        })
        return zero
    }

    subtractArr = (moneyArr: IMoney[]): IMoney => {
        let zero: IMoney = moneyArr[0]
        moneyArr.forEach( e => {
            if (!e.equalsTo(zero)){
                zero = this.subtract(zero, e)
            }
        })
        return zero
    }

    multiplyArr = (moneyArr: IMoney[]): IMoney => {
        let zero: IMoney = moneyArr[0]
        moneyArr.forEach( e => {
            if (!e.equalsTo(zero)){
                zero = this.multiply(zero, e.toUnit())
            }
        })
        return zero
    }

    divideArr = (moneyArr: IMoney[]): IMoney => {
        let zero: IMoney = moneyArr[0]
        moneyArr.forEach( e => {
            if (!e.equalsTo(zero)){
                zero = this.divide(zero, e.toUnit())
            }
        })
        return zero
    }
    

}
