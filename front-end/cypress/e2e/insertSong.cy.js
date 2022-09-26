import { faker } from "@faker-js/faker";

describe("insert recommendation suit test", () => {

    beforeEach(()=>{
        cy.request("POST","http://localhost:5015/e2eRouter/resetDB")
      });

    it("given valid recommendation data when the insert button is clicked then it should insert new music recommendation and clear input data", () => {
        cy.request("POST","http://localhost:5015/e2eRouter/resetDB");
       
        const validRecommendation = {
            name: faker.music.songName(),
            youtubeLink: 'https://www.youtube.com/watch?v=FnGfgb_YNE8',
        };

        cy.visit("http://localhost:3000");

        cy.get('[data-cy="input-name"]').type(validRecommendation.name);
        cy.get('[data-cy="input-url"]').type(validRecommendation.youtubeLink);

        cy.intercept("POST", "http://localhost:5015/recommendations").as("createRecomendation");

        cy.get('[data-cy="input-submit"]').click();
        cy.wait("@createRecomendation");

        cy.contains(validRecommendation.name);
    });

})