import { faker } from "@faker-js/faker";
import prisma from "../../src/database";


export async function createNewRecommendation() {
    let name: string = "";
    let nameIsRepeated: boolean = true;
    while (nameIsRepeated){
        name = faker.music.songName();
        let checkName = await prisma.recommendation.findUnique({
            where : {
                name,
            },
        });
        if(checkName === null) nameIsRepeated = false;
    }

    const youtubeLink = `www.youtube.com/${faker.random.alphaNumeric()}`;

    const newRecommendation = {
        name,
        youtubeLink
    }

    return newRecommendation;
}

export async function insertNewRecommendation(){
    let newRecommendation = await createNewRecommendation();
    let recommendationCreated = await prisma.recommendation.create({
        data: newRecommendation
    });
    return recommendationCreated;
}

export async function insertNewRecommendations(n: number) {
    for (let i = 0; i < n; i++) {
      await insertNewRecommendation();
    }
  }



export async function registeredSongName(){
    const originalRecommendation = await createNewRecommendation();
    const name = originalRecommendation.name;
    await prisma.recommendation.create({
        data: originalRecommendation,
    });

    return name;
}


export async function getRecommendationById(id: number){
    const recommendation = await prisma.recommendation.findUnique({
        where : {
            id,
        },
    });

    return recommendation;
}
