import IMoney from "../interfaces/IMoney.ts";
import IMoneyAid from "../aid/imoneyAid.ts";

export default class Ofc{

    futureValue = (
        tax:number, period:number, pv:IMoney=IMoneyAid.getImoney(0), pmt:IMoney=IMoneyAid.getImoney(0)
    ): IMoney => {
        this.ensureState(true, true, tax, period)

        const fv:number = this.fv(pv, tax, period)
        return IMoneyAid.getImoney(fv  + (pmt.toUnit() * (((1+tax)**period)-1)/tax) )
    }
    private fv = (pv:IMoney, tax:number, period:number):number => pv.toUnit()*(1+tax)**period

    presentValue = (
        tax:number, period:number, fv:IMoney=IMoneyAid.getImoney(0), pmt:IMoney=IMoneyAid.getImoney(0)
    ): IMoney => {
        const discountFactor = (1 - (1 + tax) ** -period) / tax;
        const pmtFactor = discountFactor * (1 + tax);
        return IMoneyAid.getImoney(this.pv(fv, tax, period)).sum(IMoneyAid.getImoney(pmt.toUnit() * pmtFactor));
    }        
    private pv = (fv:IMoney, tax:number, period:number): number => fv.toUnit()/((1+tax)**period)

    tax = (fv:IMoney, pv:IMoney, period:number): number => {
        this.ensureState(false, true, 0, period)

        const tax:number = ((fv.toUnit() / pv.toUnit())**(1 / period))-1
        return parseFloat( tax.toFixed(fv.getPrecision()) )
    }

    period = (fv:IMoney, pv:IMoney, tax:number): number => {
        this.ensureState(true, false, tax, 0)

        const period:number = (Math.log( fv.toUnit() / pv.toUnit() )) / Math.log(1+tax)
        return parseInt( period.toFixed(fv.getPrecision()) )
    }

    private ensureState(hasTax:boolean, hasPeriod:boolean, tax:number, period:number){
        if (hasTax && tax <= 0) throw new Error("Taxa deve ser maior que 0.")
        if (hasPeriod && period <= 0) throw new Error("Periodo deve ser maior que 0.")
    }
    
}