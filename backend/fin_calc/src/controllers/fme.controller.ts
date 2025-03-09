import { RouterContext} from "../dependencies/requisition.deps.ts";
import MyDinero from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";
import IMoney from "../models/interfaces/IMoney.ts";
import IMoneyAid from "../models/aid/getImony.ts";
import { InvalidArgumentError } from "../Exceptions/operations.execption.ts";

export default class FmeController {
    fme = new Fme()
    // DADOS DA URL
    public sum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.sum(main, other).toFormat();
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

    // DADOS DO BODY

    public async sumBody(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        await this.exec(this.sumArr.bind(this), ctx);
    }

    public async subtractBody(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        await this.exec(this.subtractArr.bind(this), ctx);
    }

    public async multiplyBody(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        await this.exec(this.multiplyArr.bind(this), ctx);
    }

    public async divideBody(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        await this.exec(this.divideArr.bind(this), ctx);
    }

    // FUNÇÕES AUXILIÁRES => privadas
        
    private async exec(
        func: (ctx: RouterContext<string, { value1: string, value2: string }, Record<string, any>>) => Promise<void>,
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, any>>
    ): Promise<void> {
        try {
            return await func(ctx);
        } catch (error) {
            if (error instanceof InvalidArgumentError) {
                ctx.response.status = 400;
                ctx.response.body = { message: error.message };
            } else {
                ctx.response.status = 500;
                ctx.response.body = { message: 'Erro inesperado', error: error };
            }
        }
    } 

    private async sumArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.sumArr(moneyArr)
        ctx.response.body = { result : instance.toString() };
    }

    private async subtractArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.subtractArr(moneyArr)
        ctx.response.body = { result : instance.toString() };
    }

    private async multiplyArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.multiplyArr(moneyArr)
        ctx.response.body = { result : instance.toString() };
    }

    private async divideArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.divideArr(moneyArr)
        ctx.response.body = { result : instance.toString() };
    }

    private getArrFromUrl = (
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ) : IMoney[] => {
        const main = new MyDinero(parseFloat(ctx.params.value1));
        const other = new MyDinero(parseFloat(ctx.params.value2));
      
        return [main, other];
    }

    private getArrFromBody = async (
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<IMoney[]>  => {
        const data = await ctx.request.body.text();            
        const parsedData: number[] =  JSON.parse(data);
        const moneyArr: IMoney[] = [];        
        parsedData.forEach(e => { moneyArr.push(IMoneyAid.getImoney(e)) });
        return moneyArr
    }
}
