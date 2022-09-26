import { jest } from "@jest/globals";
import prisma from "../../src/database";
import { recommendationService, CreateRecommendationData } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import {
    createNewRecommendation,
    insertNewRecommendation,
    insertNewRecommendations,
    registeredSongName,
    getRecommendationById
} from "../factories/recomendationsFactory";


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
  });

describe("recommendation services unit test suite", () => {
    
    it(`given a valid recommendation data when isert a function is called then it shoul create a new recoomendation`, async () => {

        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(async (): Promise<any> => {});

        const createData = await createNewRecommendation();
       
        await recommendationService.insert(createData);

        expect(recommendationRepository.create).toBeCalled(); 
    });

    it(`given duplicated recommendation data when isert a function is called then it should throw conflict error`, async () => {

        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(():any => []);
        
        const registeredName = await registeredSongName();
        let createData = await insertNewRecommendation();
        createData.name = registeredName;

        const result = recommendationService.insert(createData);

        expect(result).rejects.toEqual({type: "conflict", message:"Recommendations names must be unique"}); 
        
    });

    it(`given a valid id when update function is called then it should incremenet the counting score`, async () => {

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => []);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => []);

        const recommendation = await insertNewRecommendation();

        await recommendationService.upvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();

    });

    it(`given a invalid id when update function is called then it should return not found error`, async () => {
        const id = -1;

        const promise = recommendationService.upvote(id);

        expect(promise).rejects.toEqual({type: "not_found", message:""});
    });

    it(`given a valid id from a recommendation whose score is greater than -5 when downvote function is called then it should decrement the counting score`, async () => {

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => []);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => []);

        const recommendation = await insertNewRecommendation();

        await recommendationService.downvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();

    });

    it(`given a valid id from a recommendation whose score is equals to -5 when downvote function is called then it should get the corresponding recommendation and decrement its score and remove this recommendation`, async () => {

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => recommendation);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return {...recommendation, score: -6};
        });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => {});

        const create = await createNewRecommendation();
        const recommendation = {...create, id: 1, score: -5};

        await recommendationService.downvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();

    });

    it(`given a invalid id when downvote function is called then it should return not found error`, async () => {
        const id = -1;

        const promise = recommendationService.downvote(id);

        expect(promise).rejects.toEqual({type: "not_found", message:""})
    });

    it(`when GET function is called then it should return recommendation through findAll function from repository`, async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => []);

        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });

   it(`give a valid id when the function GetByIdOrFail is called then it should return the corresponding recommendation`, async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => []);

        const recommendation = await insertNewRecommendation();

        await recommendationService.getById(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
   });

   it(`give a invalid id when the function GetByIdOrFail is called then it should return a not found error`, async () => {
    const id = -1;

    const promise = recommendationService.downvote(id);

    expect(promise).rejects.toEqual({type: "not_found", message: ""});
    
    });

    it(`give a valid amount, it will be incremented for each register. When the getTop function is called then is should return the amounts recommendations ordered by score`, async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => []);
        const n = 20;
        await insertNewRecommendations(n);

        const amount = n/2;
        await recommendationService.getTop(amount);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

    it(`give a valid amount, taht it will be decrease for each register unliked. When the getTop function is called then is should return the amounts recommendations ordered by score`, async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => []);

        const n = 20;
        await insertNewRecommendations(n);

        const amount = n * 2;
        await recommendationService.getTop(amount);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

    it(`given that there are one or more recommendation registered when getRamdom function is called then it should return a radom recommendation`, async () => {
        jest.spyOn(Math, "random").mockImplementationOnce(() => 0.1);

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => recommendations);

        jest.spyOn(Math, "floor").mockImplementationOnce((): any => 0);

        let recommendation = await createNewRecommendation();

        const recommendations = [
            {...recommendation, id: 1, name: "aaa", score: 15},
            {...recommendation, id: 2, name: "bbb", score: -1},
            {...recommendation, id: 3, name: "ccc", score: -2},
        ];
        
        await recommendationService.getRandom();

        expect(Math.random).toBeCalled();
        expect(recommendationRepository.findAll).toBeCalled();
        expect(Math.floor).toBeCalled();
    });

    it(`give that are no recommendations registered yet when getRandom is called the it should return a not found error`, async () => {
        jest.spyOn(Math, "random").mockImplementationOnce(() => {
            return 0.8;
        });

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => []);

        const promise = recommendationService.getRandom();

        expect(promise).rejects.toEqual({
            type: "not_found",
            message: "",
        });
    });

    it("test function getRecommendationById", async () => {
        const recommendation = await insertNewRecommendation();
        const maximumScore = 1000;
        const randomScore = Math.floor(Math.random() * maximumScore + 1);
        const result = await prisma.recommendation.update({
            where : {
                id: recommendation.id,
            },
            data: {
                score: randomScore,
            },
        });

        const recAfter = await getRecommendationById(recommendation.id);
        

        expect(result.id).toEqual(recAfter.id);
        
    });
});

afterAll(async () => {
    await prisma.$disconnect();
})