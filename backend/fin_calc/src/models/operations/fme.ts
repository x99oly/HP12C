import IFme from "../interfaces/IFme.ts";
import IMoney from "../interfaces/IMoney.ts";
import IMoneyAid from "../aid/getImony.ts";
import { InvalidArgumentError } from "../../Exceptions/operations.execption.ts";

export default class Fme implements IFme {    

    sum = (addend: IMoney, adder: IMoney): IMoney => addend.sum(adder)

    subtract = (addend: IMoney, adder: IMoney): IMoney => addend.subtract(adder)

    multiply = (addend: IMoney, count: number): IMoney => addend.multiply(count)

    divide = (addend: IMoney, count: number): IMoney =>  addend.divide(count)

    powerOf = (base: IMoney, exponent: number): IMoney  => {
        let num: number = Math.pow(base.toUnit(), exponent)
        if (IMoneyAid.isFloat(num)){
            num = Math.round(num * base.getScalePrecision())
        }
        return IMoneyAid.getImoney(num, false)
    }

    rootOf = (index: IMoney, radicand: number): IMoney => {
        if (radicand === 0)
            throw new InvalidArgumentError("Radicando não pode ser 0.")
        if (radicand === 1)
            return index
        
        let num: number = index.toUnit() ** ( 1/radicand )
        if (IMoneyAid.isFloat(num)){
            num = Math.round(num * index.getScalePrecision())
        }
        return IMoneyAid.getImoney(num, false)
    }

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
