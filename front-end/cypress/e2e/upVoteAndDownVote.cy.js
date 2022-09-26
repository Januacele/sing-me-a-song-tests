import { faker } from '@faker-js/faker';

describe("Test the UpVote and DownVote buttons and ensure the deletion works", () => {

    beforeEach(()=>{
        cy.request("POST","http://localhost:5015/e2eRouter/resetDB");
    });

    it("Test back buttons and delete item with score < -5", () => {
        cy.request("POST","http://localhost:5015/e2eRouter/resetDB");

        const recommendation = {
            name: faker.name.fullName(),
            urlYoutube: "https://www.youtube.com/watch?v=g8psa0UBZKA"
        }

        cy.visit("http://localhost:3000");
        cy.get('[data-cy="input-name"]').type(recommendation.name);
        cy.get('[data-cy="input-url"]').type(recommendation.urlYoutube);

        cy.intercept("POST", "http://localhost:5015/recommendations").as("createRecommendation");
        cy.get('[data-cy="input-submit"]').click()
        
        cy.contains(recommendation.name);

        for(let i=0; i<1; i++){
            cy.get("article").find('[data-cy="arrowUp"]').click()
        }

        for(let i=0; i<8; i++){
            cy.get("article").find('[data-cy="arrowDown"]').click()
        }

        cy.get("article").should('not.exist');
    });

});