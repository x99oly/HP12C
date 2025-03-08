import { RouterContext } from "../dependencies/requisition.deps.ts";
import MyDinero from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";

export default class FmeController {
    fme = new Fme()
    public GetSum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = new MyDinero(parseFloat(ctx.params.value2));
      
        ctx.response.body = this.fme.sum(main,other).toReal()
    }
    public GetSubtract(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = new MyDinero(parseFloat(ctx.params.value2));
      
        ctx.response.body = this.fme.subtract(main,other).toReal()
    }
    public GetMultiply(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = parseFloat(ctx.params.value2);
      
        ctx.response.body = this.fme.multiply(main,other).toReal() 
    }
    public GetDivide(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = parseFloat(ctx.params.value2);
      
        ctx.response.body = this.fme.divide(main,other).toReal() 
    }
}
