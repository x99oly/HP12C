import { Application, Router } from "./src/dependencies/requisition.deps.ts";
import calcRouter from "./src/routes/calcRouter.ts";

const port = 8000

const app = new Application();

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Hello, Deno!";
});

router.use("/calc", calcRouter.routes())

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: port });
console.log("Server running on http://localhost:8000");

// Para rodar testes
// deno test --allow-read --allow-net --allow-env --allow-import