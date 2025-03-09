import { Router } from "../dependencies/requisition.deps.ts";
import FmeController from "../controllers/fme.controller.ts";

const calcRouter = new Router();
const fmeController = new FmeController();

// Soma
calcRouter.get("/fme.sum/:value1/:value2", fmeController.sum.bind(fmeController));
calcRouter.post("/fme.sum", fmeController.sumBody.bind(fmeController));

// Subtração
calcRouter.get("/fme.subtract/:value1/:value2", fmeController.subtract.bind(fmeController));
calcRouter.post("/fme.subtract", fmeController.subtractBody.bind(fmeController));

// Multiplicação
calcRouter.get("/fme.multiply/:value1/:value2", fmeController.multiply.bind(fmeController));
calcRouter.post("/fme.multiply", fmeController.multiplyBody.bind(fmeController));

// Divisão
calcRouter.get("/fme.divide/:value1/:value2", fmeController.divide.bind(fmeController));
calcRouter.post("/fme.divide", fmeController.divideBody.bind(fmeController));

export default calcRouter;
