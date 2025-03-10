export default interface IMoney {
    getInstance(): object
    setFormat(format:string):void
    getID():string

    getAmount(): number; // return the integer or cents one
    getCurrency(): string;
    getLocale(): string;
    getPrecision(): number;
    
    equalsTo(other: IMoney): boolean;
    
    setLocale(locale: string): void;
    convertPrecision(precision: number): number;
    getScalePrecision(): number
    toFormat(): string;
    toUnit(): number;
    
    sum(other: IMoney): IMoney;
    subtract(other: IMoney): IMoney;
    multiply(other: number): IMoney;
    divide(other: number): IMoney;
    toJSON(): object;

    percentagem(percent:number): number

    toString(): string

}
    // lessThanOrEqual(other: IMoney): boolean;
    // greaterThan(other: IMoney): boolean;
    // greaterThanOrEqual(other: IMoney): boolean;
    // isZero(): boolean;
    // isPositive(): boolean;
    // isNegative(): boolean;
    // hasSubUnits(): boolean;
    // toRoundedUnit(): number;
    // toObject(): object;
    // normalizePrecision(): IMoney;
    // lessThan(other: IMoney): boolean;
    // hasSameCurrency(other: IMoney): boolean;
    // hasSameAmount(other: IMoney): boolean;
