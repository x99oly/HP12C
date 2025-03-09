import IFme from "../interfaces/IFme.ts";
import IMoney from "../interfaces/IMoney.ts";

export default class Fme implements IFme {    

    sum = (addend: IMoney, adder: IMoney): IMoney => addend.sum(adder)

    sumArr = (moneyArr: IMoney[]): IMoney => {
        let zero: IMoney = moneyArr[0]
        console.log(zero.getAmount())
        moneyArr.forEach( e => {
            if (!e.equalsTo(zero)){
                console.log("entrou")
                zero = this.sum(zero, e)
            }
        })
        return zero
    }

    subtract = (addend: IMoney, adder: IMoney): IMoney => addend.subtract(adder)

    multiply = (addend: IMoney, count: number): IMoney => addend.multiply(count)

    divide = (addend: IMoney, count: number): IMoney => addend.divide(count)
    
}
