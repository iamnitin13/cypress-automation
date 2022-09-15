/// <reference types="cypress" />

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJhZG1pbiIsIl9pZCI6IjYzMWVlZjRlMDZiM2M0MDAwOTgwNTNmNyIsIm5hbWUiOiJ1c2VyIiwiaWF0IjoxNjYyOTc0NDc5LCJleHAiOjE2NjgxNTg0Nzl9.T1SuOnVeQCIdYXtBLNSrtWX1D_p7tYAlnoRkdZt02Aw";

describe("Basic Desktop Tests authorised", () => {
  before(() => {
    //setting token in localstorage for testing using window object (cypress do not provide any API)
    cy.then(() => {
      window.localStorage.setItem("__auth__token", token);
    });
  });

  beforeEach(() => {
    // bootstrapping the external things
    cy.viewport(1280, 720); // setting the viewport
    cy.visit("https://codedamn.com");
  });

  it("should test playground", () => {
    cy.visit("https://codedamn.com/playground/_BqVddWUej99ED_Fuq_IK");

    cy.log("Checking for loading svg!");
    cy.get(".content-area svg").should("exist");
    // cy.debug();

    cy.log("Checking for loading auth token message!");
    cy.get(".relative span").should("include.text", "Getting your auth tokens");

    cy.log("Playground have intialized");
    cy.get("[data-testid=explorer-column]", { timeout: 10 * 1000 }).should(
      "exist"
    );
  });

  it("should test file created from terminal", () => {
    cy.visit("https://codedamn.com/playground/_BqVddWUej99ED_Fuq_IK");
    cy.get(".content-area svg").should("exist");
    cy.get("[data-testid=explorer-column]", { timeout: 10 * 1000 }).should(
      "exist"
    );
    // const fileName = Math.random().toString().slice(0, 3);

    cy.get("[data-testid=xterm]")
      .type("{ctrl}{c}")
      .type("touch testscript1.js{enter}");

    cy.contains("testscript1.js").should("exist");
  });
});
