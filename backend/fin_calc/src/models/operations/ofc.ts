import IMoney from "../interfaces/IMoney.ts";
import IMoneyAid from "../aid/imoneyAid.ts";

export default class Ofc{
    FutureValue = (pv:IMoney, tax:number, period:number): IMoney => {
        const fv:number = pv.toUnit()*(1+tax)**period
        return IMoneyAid.getImoney(fv)
    }

    PresentValue = (fv:IMoney, tax:number, period:number): IMoney => {
        const pv:number = fv.toUnit()/((1+tax)**period)
        return IMoneyAid.getImoney(pv)
    }

    tax = (fv:IMoney, pv:IMoney, period:number): number => {
        const tax:number = ((fv.toUnit() / pv.toUnit())**(1 / period))-1
        return parseFloat( tax.toFixed(fv.getPrecision()) )
    }

    period = (fv:IMoney, pv:IMoney, tax:number): number => {
        const period:number = (Math.log( fv.toUnit() / pv.toUnit() )) / Math.log(1+tax)
        return parseInt( period.toFixed(fv.getPrecision()) )
    }
    
}