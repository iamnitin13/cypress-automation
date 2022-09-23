/// <reference types="cypress" />

describe("My HTTP TESTING SUITE", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  });
  it("should test booksretrievals get api", () => {
    //cy.intercept({requestObject},{responseObject})  control the behavior of HTTP requests/response
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          { book_name: "RobotFramework", isbn: "984353", aisle: "982053" },
        ],
      }
    ).as("booksretrievals");

    // after click on btn request will go & cypress intercept that request
    cy.get(".btn-primary").click();

    // cypress need to wait until the intercept yield the request (means untill it resolve the promise & cypress send the mock data to the browser)
    // wait for ms or allias to resolve & then move to next code

    cy.wait("@booksretrievals").should(({ request, response }) => {
      // lenght of mock response == length of total row
      // testing integration of frontend & backend
      cy.get("tr").should("have.length", response.body.length + 1);
    });

    cy.get("p").should("have.text", "Oops only 1 Book available");
  });
});
