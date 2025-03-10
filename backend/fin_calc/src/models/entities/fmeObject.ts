export default class FmeObject {
    mainValue: number;
    secValue: number;
    currency: string;
    precision: number;
    numbers?: number[];
  
    constructor(
    mainValue:number, secValue:number=0, currency:string = "BRL", precision:number=2,numbers:number[] = []
 ) {
      this.mainValue = mainValue;
      this.secValue = secValue;
      this.currency = currency;
      this.precision = precision;
      this.numbers = numbers;
    }

    toJSON(){
        return {
            "mainValue" : this.mainValue,
            "secValue" : this.secValue || 0,
            "currency" : this.currency,
            "precision" : this.precision,
            "numbers" : this.numbers
        }
    }
  }
  