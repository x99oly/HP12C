import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import Fme from "../../src/models/operations/fme.ts";
import IMoney from "../../src/models/interfaces/IMoney.ts";
import IMoneyAid from "../../src/models/aid/imoneyAid.ts";

const fme = new Fme();

const instances = (num1: number, num2: number): IMoney[] => [IMoneyAid.getImoney(num1),IMoneyAid.getImoney(num2)];

// SOMA 
Deno.test("1 - Verify the result of the sum of two numbers", () => {
    const moneys = [IMoneyAid.getImoney(2),IMoneyAid.getImoney(4)]; 
    const result = fme.sum(moneys[0], moneys[1]);

    const expected = "R$6.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("2 - Verify the result of the sum with negative numbers", () => {
    const moneys = instances(-3, -7);
    const result = fme.sum(moneys[0], moneys[1]);

    const expected = "-R$10.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("3 - Verify the result of the sum with zero", () => {
    const moneys = instances(0, 4);
    const result = fme.sum(moneys[0], moneys[1]);

    const expected = "R$4.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("4 - Verify the result of the sum of an array", () => {
    const moneys = instances(1, 2);
    const result = fme.sumArr(moneys);

    const expected = "R$3.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("5 - Verify the result of the sum of a larger array", () => {
    const moneys = [
        IMoneyAid.getImoney(1.5),
        IMoneyAid.getImoney(2.5),
        IMoneyAid.getImoney(3.0),
        IMoneyAid.getImoney(4.0),
        IMoneyAid.getImoney(5.0),
    ];
    const result = fme.sumArr(moneys);

    const expected = "R$16.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});


// SUBTRAÇÃO
Deno.test("6 - Verify the result of the subtraction of two numbers", () => {
    const moneys = instances(6, 4);
    const result = fme.subtract(moneys[0], moneys[1]);

    const expected = "R$2.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("7 - Verify the result of the subtraction of an array", () => {
    const moneys = instances(6, 2);
    const result = fme.subtractArr(moneys);

    const expected = "R$4.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("8 - Verify the result of the subtraction of a larger array", () => {
    const moneys = [
        IMoneyAid.getImoney(10),
        IMoneyAid.getImoney(2),
        IMoneyAid.getImoney(1.5),
        IMoneyAid.getImoney(0.5),
        IMoneyAid.getImoney(1),
    ];
    const result = fme.subtractArr(moneys);

    const expected = "R$5.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});


// MULTIPLICAÇÃO
Deno.test("9 - Verify the result of multiplying two numbers", () => {
    const moneys = instances(2, 3);
    const result = fme.multiply(moneys[0], 2);

    const expected = "R$4.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("10 - Verify the result of multiplying an array", () => {
    const moneys = instances(2, 3);
    const result = fme.multiplyArr(moneys);

    const expected = "R$6.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("11 - Verify the result of multiplying a larger array", () => {
    const moneys = [
        IMoneyAid.getImoney(1.5),
        IMoneyAid.getImoney(2),
        IMoneyAid.getImoney(3),
        IMoneyAid.getImoney(4),
    ];
    const result = fme.multiplyArr(moneys);

    const expected = "R$36.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});


// DIVISÃO
Deno.test("12 - Verify the result of dividing two numbers", () => {
    const moneys = instances(6, 2);
    const result = fme.divide(moneys[0], 3);

    const expected = "R$2.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("13 - Verify the result of dividing an array", () => {
    const moneys = instances(6, 2);
    const result = fme.divideArr(moneys);

    const expected = "R$3.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("14 - Verify the result of dividing a larger array", () => {
    const moneys = [
        IMoneyAid.getImoney(36),
        IMoneyAid.getImoney(3),
        IMoneyAid.getImoney(2),
        IMoneyAid.getImoney(1),
    ];
    const result = fme.divideArr(moneys);

    const expected = "R$6.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("15 - Verify dividing by zero throws error", () => {
    const moneys = instances(6, 0);
    assertThrows(() => fme.divide(moneys[0], 0), 
    Error, 
    "Divide by 0 is not allowed");
});

Deno.test("16 - Verify dividing an array by zero throws error", () => {
    const moneys = instances(6, 0);
    assertThrows(() => fme.divideArr(moneys), 
    Error, 
    "Divide by 0 is not allowed");
});

Deno.test("17 - Verify the result of dividing by a value that is not a number", () => {
    const moneys = [IMoneyAid.getImoney(10), IMoneyAid.getImoney(0)];
    assertThrows(() => fme.divide(moneys[0], moneys[1].toUnit()), Error, "Divide by 0 is not allowed");
});

Deno.test("18 - Verify the result of sum with a value that is not a number", () => {
    assertThrows(() => IMoneyAid.getImoney("abc" as any), 
    Error, 
    "Não é permitido iniciar MyDinero com valores não numéricos.");
});

Deno.test("19 - Verify dividing negative numbers", () => {
    const moneys = instances(-6, 2);
    const result = fme.divide(moneys[0], moneys[1].toUnit());

    const expected = "-R$3.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("20 - Verify dividing floating point numbers", () => {
    const moneys = instances(5.5, 2);
    const result = fme.divide(moneys[0], moneys[1].toUnit());

    const expected = "R$2.75";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("21 - Verify dividing by 1", () => {
    const moneys = instances(6, 1);
    const result = fme.divide(moneys[0], moneys[1].toUnit());

    const expected = "R$6.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("22 - Verify dividing 0 by a number", () => {
    const moneys = instances(0, 2);
    const result = fme.divide(moneys[0], moneys[1].toUnit());

    const expected = "R$0.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("23 - Verify dividing a smallest part of a money.", () => {
    const moneys = instances(0.01, 2);
    const result = fme.divide(moneys[0], moneys[1].toUnit());

    const expected = "R$0.00"; // Dependendo da precisão esperada
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

// POTENCIAÇÃO

Deno.test("24 - Verify the power of a number", () => {
    const moneys = instances(4,0)
    const a: IMoney = fme.powerOf(moneys[0], 2)
    const b: IMoney = fme.powerOf(moneys[0], 3)
    const d: IMoney = fme.powerOf(moneys[1], 2)
    const e: IMoney = fme.powerOf(moneys[0], 0)
    const f: IMoney = fme.powerOf(moneys[0], 1.5)

    assertEquals(a.toUnit(), 16)
    assertEquals(b.toUnit(), 64)
    assertEquals(d.toUnit(), 0)
    assertEquals(e.toUnit(), 1)
    assertEquals(f.toUnit(), 8)
})

// RAÍZ

Deno.test("25 - Verify the root of a number", () => {
    const moneys: IMoney[] = instances(16, 9);
    
    const a: IMoney = fme.rootOf(moneys[0], 2);
    const b: IMoney = fme.rootOf(moneys[1], 2);
    const c: IMoney = fme.rootOf(moneys[0], 1);

    assertEquals(a.toUnit(), 4)
    assertEquals(b.toUnit(), 3)
    assertEquals(c.toUnit(), 16)
    assertThrows( ()=> { fme.rootOf(moneys[1], 0) },
    Error,
    "Radicando não pode ser 0.")
});

// PERCENTUAL

Deno.test("26 - Verifying the right value for percentual values", () => {
    const moneys = instances(100, 5)

    const a: number = fme.percent(moneys[0], 50)
    const b: number = fme.percent(moneys[0], 95.5)
    const c: number = fme.percent(moneys[1], 50)

    assertEquals(a, 50)
    assertEquals(b, 95.5)
    assertEquals(c, 2.5)
})

Deno.test("27 - multiply with large and decimal values", () => {
    const testCases = [
        {
            addend: IMoneyAid.getImoney(1234.5678), // valor decimal
            count: 1000,
            expected: "R$1,234,567.80", // ajuste conforme esperado
        },
        {
            addend: IMoneyAid.getImoney(0.0001234), // valor bem pequeno
            count: 1000000,
            expected: "R$123.40", // ajuste conforme esperado
        },
        {
            addend: IMoneyAid.getImoney(9999999.99), // valor grande
            count: 1,
            expected: "R$9,999,999.99", // ajuste conforme esperado
        },
        {
            addend: IMoneyAid.getImoney(999.99), // valor com 2 casas decimais
            count: 100,
            expected: "R$99,999.00", // ajuste conforme esperado
        },
    ];

    testCases.forEach(({ addend, count, expected }) => {
        const result = fme.multiply(addend, count);
        assertEquals(result.toFormat(), expected);
    });
});

Deno.test("28 - divide with large and decimal values", () => {
    const testCases = [
        {
            addend: IMoneyAid.getImoney(1234567.89), // valor grande
            count: 0.258,
            expected: "R$4,785,146.86", // ajuste conforme esperado
        },
        {
            addend: IMoneyAid.getImoney(987654321.9876), // valor grande e decimal
            count: 145.6897,
            expected: "R$6,779,163.67", // ajuste conforme esperado
        },
        {
            addend: IMoneyAid.getImoney(0.0001234), // valor bem pequeno
            count: 100,
            expected: "R$0.00", // ajuste conforme esperado, considerando arredondamento
        },
        {
            addend: IMoneyAid.getImoney(5000.75), // valor com casas decimais
            count: 10,
            expected: "R$500.08", // ajuste conforme esperado
        },
    ];

    testCases.forEach(({ addend, count, expected }) => {
        const result = fme.divide(addend, count);
        assertEquals(result.toFormat(), expected);
    });
});

Deno.test("29 - multiply precision test with increasing decimal places", () => {
    let addend = IMoneyAid.getImoney(15); // valor fixo
    let expectedResult: IMoney = IMoneyAid.getImoney(150.00)
    let newExpectedResult:IMoney

    for (let i = 1; i <= 120; i++) {
        const count = parseFloat('9.' + '9999'.repeat(i));
        const result = fme.multiply(addend, count);
        const expected:IMoney = expectedResult;

        // console.log(`${result.toFormat()} & ${expected.toFormat()}`)
        assertEquals(result.toFormat(), expected.toFormat()); // Verificação de precisão

        addend = addend.sum(IMoneyAid.getImoney(1))
        newExpectedResult = IMoneyAid.getImoney(10)
        expectedResult = fme.sum(expectedResult, newExpectedResult)
    }
});





