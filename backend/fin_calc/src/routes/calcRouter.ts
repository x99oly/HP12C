import { Router } from "../dependencies/requisition.deps.ts";
import FmeController from "../controllers/fme.controller.ts";

const calcRouter = new Router();
const fmeController = new FmeController();

calcRouter.get("/fme.sum/:value1/:value2", fmeController.sum.bind(fmeController));
calcRouter.post("/fme.sum", fmeController.sum.bind(fmeController));
calcRouter.get("/fme.subtract/:value1/:value2", fmeController.subtract.bind(fmeController));
calcRouter.get("/fme.multiply/:value1/:value2", fmeController.multiply.bind(fmeController));
calcRouter.get("/fme.divide/:value1/:value2", fmeController.divide.bind(fmeController));

export default calcRouter;
