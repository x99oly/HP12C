import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import IMoneyAid from "../../src/models/aid/imoneyAid.ts";
import { AssertionError } from "@std/assert/assertion-error";

Deno.test("1 - Verify the returning of 'isFloat' for integers", () =>{
    const bo1: boolean = IMoneyAid.isFloat(10)
    const bo2: boolean = IMoneyAid.isFloat(10.0)
    const bo3: boolean = IMoneyAid.isFloat(10.5)

    assertEquals(bo1, false)
    assertEquals(bo2, false)
    assertEquals(bo3, true)
})

Deno.test("2 - Verifying the returning of a string cast to int number.", ()=>{
    const a:string = "5"
    const b:string = "5.5"
    const c:string = "-19.25"
    const d:string = "not.number"

    assertEquals(IMoneyAid.getIntFromString(a),5)
    assertEquals(IMoneyAid.getIntFromString(b),55)
    assertEquals(IMoneyAid.getIntFromString(c), -1925)
    assertEquals(IMoneyAid.getIntFromString(d), NaN)

} )

Deno.test("2 - Verifying the returning of a float number cast to int number or cents.", ()=>{
    const a:number = 5
    const b:number = 5.5
    const c:number = -19.5

    assertEquals(IMoneyAid.getCentsFromFloat(a,2), 500)
    assertEquals(IMoneyAid.getCentsFromFloat(b,5), 550000)
    assertEquals(IMoneyAid.getCentsFromFloat(c,2), -1950)

} )