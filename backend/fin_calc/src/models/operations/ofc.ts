import IMoney from "../interfaces/IMoney.ts";
import IMoneyAid from "../aid/imoneyAid.ts";

export default class Ofc{
    FutureValue = (pv:IMoney, tax:number, period:number): IMoney => {
        // const fv:number = (pv.getAmount()*(1+tax)**period).toFixed(pv.getPrecision())
        return IMoneyAid.getImoney(10)
    }
}