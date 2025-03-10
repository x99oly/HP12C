import { RouterContext} from "../dependencies/requisition.deps.ts";
import MyDinero from "../models/entities/myDinero.ts";
import Fme from "../models/operations/fme.ts";
import IMoney from "../models/interfaces/IMoney.ts";
import IMoneyAid from "../models/aid/getImony.ts";
import { InvalidArgumentError } from "../Exceptions/operations.execption.ts";
import FmeObject from "../models/entities/fmeObject.ts";

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
      
        ctx.response.body = this.fme.multiply(main,(other.getAmount())).toFormat()
    }
    public divide(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        const [main, other] = this.getArrFromUrl(ctx);
      
        ctx.response.body = this.fme.divide(main,(other.getAmount())).toFormat()
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

    public async powerOf(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        await this.exec(this.powerOfAux.bind(this), ctx)        
    }

    public async rootOf(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>) {
        await this.exec(this.rootOfAux.bind(this), ctx)        
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
        ctx.response.body = { result : instance.toJSON() };
    }

    private async subtractArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.subtractArr(moneyArr)
        ctx.response.body = { result : instance.toJSON() };
    }

    private async multiplyArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.multiplyArr(moneyArr)
        ctx.response.body = { result : instance.toJSON() };
    }

    private async divideArr(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {        
        const moneyArr: IMoney[] = await this.getArrFromBody(ctx);
        const instance: IMoney = this.fme.divideArr(moneyArr)
        ctx.response.body = { result : instance.toJSON() };
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

    private getObjFromBody = async (
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<FmeObject> => {
        const decoder = new TextDecoder("utf-8")
        const str = decoder.decode((await ctx.request.body.arrayBuffer()).transferToFixedLength())
        const data: FmeObject = JSON.parse(str)
        return new FmeObject(data.mainValue, data.secValue, data.currency, data.precision, data.numbers)
    }

    private async powerOfAux(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {
        const req:FmeObject = (await this.getObjFromBody(ctx))
        const main:IMoney = IMoneyAid.getImoney(req.mainValue, false, req.currency, req.precision)
        ctx.response.body = this.fme.powerOf(main, req.secValue).toJSON()
    }

    private async rootOfAux(
        ctx: RouterContext<string, { value1: string, value2: string }, Record<string, object>>
    ): Promise<void> {
        const req:FmeObject = (await this.getObjFromBody(ctx))
        const main:IMoney = IMoneyAid.getImoney(req.mainValue, false, req.currency, req.precision)
        ctx.response.body = this.fme.rootOf(main, req.secValue).toJSON()
    }
}
