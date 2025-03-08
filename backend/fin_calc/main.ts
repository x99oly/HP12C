import { Application, Router } from "./src/dependencies/deps.ts";
import calcRouter from "./src/routes/calcRouter.ts";

const app = new Application();

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Hello, Deno!";
});

router.use("/calc", calcRouter.routes())

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
console.log("Server running on http://localhost:8000");
