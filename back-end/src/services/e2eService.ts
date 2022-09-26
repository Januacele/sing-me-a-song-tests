import * as e2eRepository from "../repositories/e2eRepository.js";


export async function resetDB() {
    const resul = await e2eRepository.resetDB();
    return resul;

}

export async function insertTopList() {
    const resul = await e2eRepository.insertTopList();
    return resul;

}
  