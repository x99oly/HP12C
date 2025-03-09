import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import IMoneyAid from "../../src/models/aid/getImony.ts";

Deno.test("1 - Verify the returning of 'isFloat' for integers", () =>{
    const bo1: boolean = IMoneyAid.isFloat(10)
    const bo2: boolean = IMoneyAid.isFloat(10.0)
    const bo3: boolean = IMoneyAid.isFloat(10.5)

    assertEquals(bo1, false)
    assertEquals(bo2, false)
    assertEquals(bo3, true)
})