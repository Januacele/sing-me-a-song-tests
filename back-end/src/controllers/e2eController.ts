import { Request, Response } from "express";

import * as e2eService from "../services/e2eService.js";

export async function resetDB(_req:Request, res:Response) {
    const resul = await e2eService.resetDB();
    res.sendStatus(200);
}

export async function insertTopList(_req:Request, res:Response) {
    const resul = await e2eService.insertTopList();
    res.sendStatus(200);
}
