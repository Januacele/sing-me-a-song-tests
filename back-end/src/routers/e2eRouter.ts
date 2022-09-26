import { Router } from "express";
import * as e2eController from "../controllers/e2eController.js"

const e2eRouter = Router()

e2eRouter.post("/resetDB", e2eController.resetDB);
e2eRouter.post("/topList", e2eController.insertTopList);

export default e2eRouter;