import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import Ofc from "../../src/models/operations/ofc.ts";
import IMoneyAid from "../../src/models/aid/imoneyAid.ts";
import IMoney from "../../src/models/interfaces/IMoney.ts";

const ofc = new Ofc();

// Testes para o método FutureValue
Deno.test("Verify the result of the Future Value (FV) for multiple cases.", () => {
    const testCases = [
        {
            pv: IMoneyAid.getImoney(1000),
            i: 0.05,
            n: 12,
            expected: "R$1,795.86",
        },
        {
            pv: IMoneyAid.getImoney(1000, false, 'BRL', 2),
            i: 0.05,
            n: 12,
            expected: "R$1,795.86",
        },
        {
            pv: IMoneyAid.getImoney(5000),
            i: 0.1,
            n: 5,
            expected: "R$8,052.55",
        },
        {
            pv: IMoneyAid.getImoney(123.45),
            i: 0.03,
            n: 10,
            expected: "R$165.91", // Resultado aproximado 
        },
    ];

    testCases.forEach(({ pv, i, n, expected }) => {
        const fv: IMoney = ofc.FutureValue(pv, i, n);
        assertEquals(fv.toFormat(), expected);
    });
});

// Testes para o método PresentValue
Deno.test("Verify the result of the Present Value (PV) for multiple cases.", () => {
    const testCases = [
        {
            fv: IMoneyAid.getImoney(1795.86),
            i: 0.05,
            n: 12,
            expected: "R$1,000.00",
        },
        {
            fv: IMoneyAid.getImoney(8052.55),
            i: 0.1,
            n: 5,
            expected: "R$5,000.00",
        },
        {
            fv: IMoneyAid.getImoney(165.91),
            i: 0.03,
            n: 10,
            expected: "R$123.45",
        },
        {
            fv: IMoneyAid.getImoney(1.01),
            i: 0.02,
            n: 1,
            expected: "R$0.99",
        },
    ];

    testCases.forEach(({ fv, i, n, expected }) => {
        const pv: IMoney = ofc.PresentValue(fv, i, n);
        assertEquals(pv.toFormat(), expected);
    });
});

// Testes para o método tax
Deno.test("Verify the result of the tax for multiple cases.", () => {
    const testCases = [
        {
            fv: IMoneyAid.getImoney(1795.86),
            pv: IMoneyAid.getImoney(1000),
            n: 12,
            expected: 0.05,
        },
        {
            fv: IMoneyAid.getImoney(8052.55),
            pv: IMoneyAid.getImoney(5000),
            n: 5,
            expected: 0.1,
        },
        {
            fv: IMoneyAid.getImoney(165.91),
            pv: IMoneyAid.getImoney(123.45),
            n: 10,
            expected: 0.03,
        },
        {
            fv: IMoneyAid.getImoney(1.01),
            pv: IMoneyAid.getImoney(0.99),
            n: 1,
            expected: 0.02,
        },
    ];

    testCases.forEach(({ fv, pv, n, expected }) => {
        const tax: number = ofc.tax(fv, pv, n);
        assertEquals(tax, expected);
    });
});

// Testes para o método period
Deno.test("Verify the result of the period for multiple cases.", () => {
    const testCases = [
        {
            fv: IMoneyAid.getImoney(1795.86),
            pv: IMoneyAid.getImoney(1000),
            tax: 0.05,
            expected: 12,
        },
        {
            fv: IMoneyAid.getImoney(8052.55),
            pv: IMoneyAid.getImoney(5000),
            tax: 0.1,
            expected: 5,
        },
        {
            fv: IMoneyAid.getImoney(165.91),
            pv: IMoneyAid.getImoney(123.45),
            tax: 0.03,
            expected: 10,
        },
        {
            fv: IMoneyAid.getImoney(1.01),
            pv: IMoneyAid.getImoney(0.99),
            tax: 0.02,
            expected: 1,
        },
    ];

    testCases.forEach(({ fv, pv, tax, expected }) => {
        const period: number = ofc.period(fv, pv, tax);
        assertEquals(period, expected);
    });
});
