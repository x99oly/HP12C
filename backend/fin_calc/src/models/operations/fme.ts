import IFme from "../interfaces/IFme.ts";
import IMoney from "../interfaces/IMoney.ts";

export default class Fme implements IFme {    

    sum = (addend: IMoney, adder: IMoney): IMoney => addend.sum(adder)

    subtract = (addend: IMoney, adder: IMoney): IMoney => addend.subtract(adder)

    multiply = (addend: IMoney, count: number): IMoney => addend.multiply(count)

    divide = (addend: IMoney, count: number): IMoney => addend.divide(count)

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
