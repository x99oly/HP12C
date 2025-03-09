import IFme from "../interfaces/IFme.ts";
import IMoney from "../interfaces/IMoney.ts";
import MyDinero from "../entities/myDinero.ts";

export default class Fme implements IFme {
    
    private getInstance = (num: number): IMoney => new MyDinero(num)

    sum = (addend: IMoney, adder: IMoney): IMoney => new MyDinero(addend.sum(adder).getAmount()/100)

    subtract = (addend: IMoney, adder: IMoney): IMoney => new MyDinero(addend.subtract(adder).getAmount()/100)

    multiply = (addend: IMoney, count: number): IMoney => new MyDinero(addend.multiply(count).getAmount()/100)

    divide = (addend: IMoney, count: number): IMoney => new MyDinero(addend.divide(count).getAmount()/100)
    
}
