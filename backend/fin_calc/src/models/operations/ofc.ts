import IMoney from "../interfaces/IMoney.ts";
import IMoneyAid from "../aid/imoneyAid.ts";

export default class Ofc{
    FutureValue = (pv:IMoney, tax:number, period:number): IMoney => {
        const fv:number = pv.getAmount()*(1+tax)**period
        const fvCents: number = IMoneyAid.getCentsFromFloat(fv, pv.getPrecision())
        return IMoneyAid.getImoney(fvCents)
    }
}