import { RouterContext } from "../dependencies/requisition.deps.ts";
import MyDinero from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";

export default class FmeController {
    fme = new Fme()
    getArrFromUrl(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = new MyDinero(parseFloat(ctx.params.value2));
      
        return [main, other];
      }
      
      public sum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.sum(main, other).toReal();
      }
      

    public subtract(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.subtract(main,other).toReal()
    }
    public multiply(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = parseFloat(ctx.params.value2);
      
        ctx.response.body = this.fme.multiply(main,other).getAmount()
    }
    public divide(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = parseFloat(ctx.params.value2);
      
        ctx.response.body = this.fme.divide(main,other).toReal() 
    }
}
