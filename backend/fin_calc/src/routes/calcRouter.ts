import { Router } from "../dependencies/requisition.deps.ts";
import FmeController from "../controllers/fme.controller.ts";

const calcRouter = new Router();
const fmeController = new FmeController();

calcRouter.get("/sum/:value1/:value2", fmeController.GetSum.bind(fmeController));
// calcRouter.get("/subtract/:value1/:value2", fmeController.GetSubtract.bind(fmeController));
// calcRouter.get("/multiply/:value1/:value2", fmeController.GetMultiply.bind(fmeController));
// calcRouter.get("/divide/:value1/:value2", fmeController.GetDivide.bind(fmeController));

export default calcRouter;
