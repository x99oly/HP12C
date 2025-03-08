import { RouterContext } from "../dependencies/requisition.deps.ts";
import Money from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";

export default class FmeController {
    fme = new Fme()
    public GetSum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const main = new Money(parseFloat(ctx.params.value1));
        const other = new Money(parseFloat(ctx.params.value2));
        
        ctx.response.body = this.fme.sum(main,other).getAmount()
    }
}
