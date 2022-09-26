

describe("Test route of recommendations sorted by score in ascending order", () => {
    
    beforeEach(()=>{
        cy.request("POST","http://localhost:5015/e2eRouter/resetDB")
      })
    
    it("Verify it the order is correct", async () => {
        cy.request("POST", "http://localhost:5015/e2eRouter/topList");
        cy.visit('http://localhost:3000/top');
        
        for(let i=0; i<6;i++){
            cy.get("article").eq(i).contains(`${i+1}_rec`);
        }

        cy.request("POST","http://localhost:5015/e2eRouter/resetDB");
    });
});