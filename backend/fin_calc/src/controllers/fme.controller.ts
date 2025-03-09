import { json } from "node:stream/consumers";
import { RouterContext} from "../dependencies/requisition.deps.ts";
import { ArgumentMissingError } from "../Exceptions/operations.execption.ts";
import MyDinero from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";
import IMoney from "../models/interfaces/IMoney.ts";

export default class FmeController {
    fme = new Fme()
      
      public sum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.sum(main, other).toReal();
      }

      public async sumBody(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        try {
            const moneyArr: IMoney[] = [];
            const data = await ctx.request.body.text();
    
            let parsedData: number[] = JSON.parse(data);
            parsedData.forEach(e => {
                moneyArr.push(new MyDinero(e));
            });

            let zero: IMoney = moneyArr[0]
            moneyArr.forEach( e => {
                if (!e.equalsTo(zero)){
                    zero = this.fme.sum(zero, e)
                }
            })
            
            ctx.response.status = 200;
            ctx.response.body = { message: 'Requisição processada com sucesso.', data: zero.getValue() };
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: 'Erro interno do servidor.', error: error };
        }
    }
    
    public subtract(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.subtract(main,other).toReal()
    }
    public multiply(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.multiply(main,(other.getAmount()/100)).getAmount()
    }
    public divide(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.divide(main,(other.getAmount()/100)).toReal() 
    }

    // FUNÇÕES AUXILIÁRES 

    getArrFromUrl(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) : IMoney[] {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = new MyDinero(parseFloat(ctx.params.value2));
      
        return [main, other];
      }
}
