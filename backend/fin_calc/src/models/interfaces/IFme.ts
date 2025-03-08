import IMoney from "./IMoney.ts";

export default interface IFme{
    sum(main:IMoney, other: IMoney): IMoney; // soma outro objeto IMoney
    subtract(main:IMoney, other: IMoney): IMoney; // subtrai outro objeto IMoney
    multiply(main:IMoney, count: number): IMoney; // multiplica outro objeto IMoney
    divide(main:IMoney, count: number): IMoney; // divide outro objeto IMoney
}