import { Context } from "https://deno.land/x/oak/mod.ts";

export default class FmeController{
    public GetSum(ctx: Context){
        ctx.response.body = ctx.request.body
    }
}