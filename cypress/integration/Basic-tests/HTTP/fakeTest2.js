/// <reference types="cypress" />

describe("My HTTP TESTING SUITE", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  });
  it("should test queryparams in http request", () => {
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=nitiin&BookName='Java'";
        req.continue((res) => {
          expect(res.statusCode).to.equal(404);
        });
      }
    ).as("dummyUrl");

    cy.get(".btn-primary").click();
    cy.wait("@dummyUrl");
  });
});
