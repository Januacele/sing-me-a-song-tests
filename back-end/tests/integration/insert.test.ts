import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database.js";
import { 
    createNewRecommendation,
    registeredSongName 
} from "../factories/recomendationsFactory.js";
import exp from "constants";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

describe("POST/recommendations/", () => {
    it("given a valid recommendation data it should insert new recommendation and return status 201", async () => {
        const databaseBefore = await prisma.recommendation.findMany();

        const body = await createNewRecommendation();
        const result = await agent.post("/recommendations/").send(body);
        const status = result.status;

        const databaseAfter = await prisma.recommendation.findMany();

        expect(status).toEqual(201);
        expect(databaseAfter.length).toBeGreaterThan(databaseBefore.length);
    });

    it("given invalid name and valid youtube url should return staus 422", async () => {
        const body = await createNewRecommendation();
        body.name = "";

        const result = await agent.post("/recommendations/").send(body);
        
        expect(result.status).toEqual(422);
    });


    it("given valid name and invalid youtube url should return staus 422", async () => {
        const body = await createNewRecommendation();
        body.youtubeLink = "";

        const result = await agent.post("/recommendations/").send(body);
        
        expect(result.status).toEqual(422);
    });

    it("given data already registered then it should return staus 409", async () => {
        const registeredName = await registeredSongName();
        
        const body = await createNewRecommendation();
        body.name = registeredName;

        const result = await agent.post("/recommendations/").send(body);

        expect(result.status).toEqual(409);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});