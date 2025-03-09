import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import Fme from "../../src/models/operations/fme.ts";
import MyDinero from "../../src/models/entities/myDinero.ts";

const fme = new Fme();

const instances = (num1: number, num2: number): MyDinero[] => [new MyDinero(num1), new MyDinero(num2)];

Deno.test("1 - Verify the result of the sum of two numbers", () => {
    const moneys = instances(2, 4);
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

Deno.test("4 - Verify the result of the subtraction of two numbers", () => {
    const moneys = instances(6, 4);
    const result = fme.subtract(moneys[0], moneys[1]);

    const expected = "R$2.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("5 - Verify the result of multiplying two numbers", () => {
    const moneys = instances(2, 3);
    const result = fme.multiply(moneys[0], 2);

    const expected = "R$4.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("6 - Verify the result of dividing two numbers", () => {
    const moneys = instances(6, 2);
    const result = fme.divide(moneys[0], 3);

    const expected = "R$2.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("7 - Verify dividing by zero throws error", () => {
    const moneys = instances(6, 0);
    assertThrows(() => fme.divide(moneys[0], 0), Error, "Divide by 0 is not allowed");
});

Deno.test("8 - Verify the result of the sum of an array", () => {
    const moneys = instances(1, 2);
    const result = fme.sumArr(moneys);

    const expected = "R$3.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("9 - Verify the result of the subtraction of an array", () => {
    const moneys = instances(6, 2);
    const result = fme.subtractArr(moneys);

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

Deno.test("11 - Verify the result of dividing an array", () => {
    const moneys = instances(6, 2);
    const result = fme.divideArr(moneys);

    const expected = "R$3.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("12 - Verify dividing an array by zero throws error", () => {
    const moneys = instances(6, 0);
    assertThrows(() => fme.divideArr(moneys), Error, "Divide by 0 is not allowed");
});

Deno.test("13 - Verify the result of the sum of a larger array", () => {
    const moneys = [
        new MyDinero(1.5),
        new MyDinero(2.5),
        new MyDinero(3.0),
        new MyDinero(4.0),
        new MyDinero(5.0),
    ];
    const result = fme.sumArr(moneys);

    const expected = "R$16.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("14 - Verify the result of the subtraction of a larger array", () => {
    const moneys = [
        new MyDinero(10),
        new MyDinero(2),
        new MyDinero(1.5),
        new MyDinero(0.5),
        new MyDinero(1),
    ];
    const result = fme.subtractArr(moneys);

    const expected = "R$5.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("15 - Verify the result of multiplying a larger array", () => {
    const moneys = [
        new MyDinero(1.5),
        new MyDinero(2),
        new MyDinero(3),
        new MyDinero(4),
    ];
    const result = fme.multiplyArr(moneys);

    const expected = "R$36.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("16 - Verify the result of dividing a larger array", () => {
    const moneys = [
        new MyDinero(36),
        new MyDinero(3),
        new MyDinero(2),
        new MyDinero(1),
    ];
    const result = fme.divideArr(moneys);

    const expected = "R$6.00";
    const formattedResult = `${result.toFormat()}`;

    assertEquals(formattedResult, expected);
});

Deno.test("17 - Verify the result of dividing by a value that is not a number", () => {
    const moneys = [new MyDinero(10), new MyDinero(0)];
    assertThrows(() => fme.divide(moneys[0], moneys[1].toUnit()), Error, "Divide by 0 is not allowed");
});

Deno.test("18 - Verify the result of sum with a value that is not a number", () => {
    assertThrows(() => new MyDinero("abc" as any), Error, "Não é permitido iniciar MyDinero com valores não numéricos.");
});
