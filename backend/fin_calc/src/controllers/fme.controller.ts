import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export default class FmeController {
    public GetSum(ctx: RouterContext<string, { value1: string, value2: string }, Record<string, any>>) {
        const value1 = ctx.params.value1;
        const value2 = ctx.params.value2;

        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);

        const sum = num1 + num2;

        ctx.response.body = { sum };
    }
}
