

describe("Test the random route, it should only contain one indication", () => {
    beforeEach(()=>{
        cy.request("POST","http://localhost:5015/e2eRouter/resetDB")
        cy.request("POST","http://localhost:5015/e2eRouter/topList")
    });

    it("Check if the order of recommendations is correct", async () => {
        cy.visit("http://localhost:3000/random");

        cy.get("article");
        cy.get("article").eq(1).should("not.exist");
    });
    
});