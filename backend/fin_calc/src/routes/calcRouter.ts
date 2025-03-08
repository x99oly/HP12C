import { Router } from "../dependencies/deps.ts";
import FmeController from "../controllers/fme.controller.ts";

const calcRouter = new Router();
const fmeController = new FmeController();

calcRouter.get("/sum/:value1/:value2", fmeController.GetSum.bind(fmeController));

export default calcRouter;
