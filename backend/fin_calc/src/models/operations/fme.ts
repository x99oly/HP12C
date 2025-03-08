import IFme from "../interfaces/IFme.ts";
import IMoney from "../interfaces/IMoney.ts";
import MyDinero from "../entities/myDinero.ts";

export default class Fme implements IFme {
    
    private getInstance = (num: number): IMoney => new MyDinero(num)

    sum = (addend: IMoney, adder: IMoney): IMoney => addend.sum(adder)

    subtract = (addend: IMoney, adder: IMoney): IMoney => addend.subtract(adder)

    multiply = (addend: IMoney, count: number): IMoney => addend.multiply(count)

    divide = (addend: IMoney, count: number): IMoney => addend.divide(count)
    
}
