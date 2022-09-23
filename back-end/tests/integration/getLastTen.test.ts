import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database.js";
import { 
    insertNewRecommendations
} from "../factories/recomendationsFactory.js";
import { Recommendation } from "@prisma/client";
import { faker } from "@faker-js/faker";


const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

describe("GET/recommendations/", () => {
    it("given ten or more recommendations registered then it should return the last ten recommendations", async () => {
        const n = parseInt(faker.random.numeric(2, {allowLeadingZeros: false}));
        await insertNewRecommendations(n);

        const result = await agent.get("/recommendations");

        const recommendations : Recommendation[] = result.body;

        expect(recommendations[0].id).toEqual(n);
        expect(recommendations.length).toEqual(10);
    });

    it("give that less than ten recommendations registered then it should return all recommendations", async () => {
        const n = parseInt(faker.random.numeric(1, {bannedDigits: ["0"]}));
        await insertNewRecommendations(n);

        const result = await agent.get("/recommendations/");
        const recommendations: Recommendation[] = result.body;

        expect(recommendations[0].id).toEqual(n);
        expect(recommendations.length).toEqual(n);
    });

    it("No recommendations is registered then it should return an empty array", async () => {
        const result = await agent.get("/recommendations/");

        const recommendations: Recommendation[] = result.body;

        expect(recommendations.length).toEqual(0);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});