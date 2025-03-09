import { RouterContext} from "../dependencies/requisition.deps.ts";
import MyDinero from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";
import IMoney from "../models/interfaces/IMoney.ts";
import IMoneyAid from "../models/aid/getImony.ts";
import { InvalidArgumentError } from "../Exceptions/operations.execption.ts";

export default class FmeController {
    fme = new Fme()
      
      public sum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.sum(main, other).toFormat();
      }

      public async sumBody(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        try {
            const moneyArr: IMoney[] = [];
            const data = await ctx.request.body.text();
                
            const parsedData: number[] = JSON.parse(data);
            parsedData.forEach(e => { moneyArr.push(IMoneyAid.getImoney(e)) });
            const zero = this.fme.sumArr(moneyArr)

            return ctx.response.body = { result: zero.toString() };
        } catch (error) {
            if (error instanceof InvalidArgumentError){
                ctx.response.status = 400;
                return ctx.response.body = { message: error.message };         
            }
            ctx.response.status = 500;
            return ctx.response.body = { message: 'Servidor deu pau', error: error };
        }        
    }
    
    public subtract(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.subtract(main,other).toFormat()
    }
    public multiply(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.multiply(main,(other.getAmount()/100)).getAmount()
    }
    public divide(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.divide(main,(other.getAmount()/100)).toFormat()
    }

    // FUNÇÕES AUXILIÁRES 

    getArrFromUrl(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) : IMoney[] {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = new MyDinero(parseFloat(ctx.params.value2));
      
        return [main, other];
      }
}
