export default interface IMoney {
    getInstance(): object
    setFormat(format:string):void

    getAmount(): number; // return the integer one
    getCurrency(): string;
    getLocale(): string;
    getPrecision(): number;
    
    equalsTo(other: IMoney): boolean;
    lessThan(other: IMoney): boolean;
    lessThanOrEqual(other: IMoney): boolean;
    greaterThan(other: IMoney): boolean;
    greaterThanOrEqual(other: IMoney): boolean;
    isZero(): boolean;
    isPositive(): boolean;
    isNegative(): boolean;
    hasSubUnits(): boolean;
    hasSameCurrency(other: IMoney): boolean;
    hasSameAmount(other: IMoney): boolean;
    
    setLocale(locale: string): void;
    
    toFormat(): string;
    toUnit(): number;
    toRoundedUnit(): number;
    toObject(): object;
    toJSON(): string;
    convertPrecision(precision: number): IMoney;
    normalizePrecision(): IMoney;
    
    sum(other: IMoney): IMoney;
    subtract(other: IMoney): IMoney;
    multiply(other: number): IMoney;
    divide(other: number): IMoney;

    toString(): string
}
