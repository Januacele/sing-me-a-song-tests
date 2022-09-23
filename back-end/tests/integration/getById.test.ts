import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database.js";
import { 
    insertNewRecommendation
} from "../factories/recomendationsFactory.js";


const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

describe("POST /recommendations/:id", () => {
    it("give a valid it and it should return the correponding recommendation", async () => {
        const created = await insertNewRecommendation();
        const id = created.id;

        const result = await agent.get(`/recommendations/${id}`);

        expect(result.status).toEqual(200);
    });

    it("give a invalid id then it should return status 404", async () => {
        const count = await prisma.recommendation.count();
        const id = count + 1;

        const result = await agent.get(`/recommendations/${id}`);

        expect(result.status).toEqual(404);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
  });