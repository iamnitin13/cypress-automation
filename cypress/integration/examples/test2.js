/// <reference types="cypress" />
// adding item in cart ,checkout , placeorder & verify it is on country selection page
describe("My SecondTest Suite", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });
  it("My FirstTest Case", () => {
    cy.get(".search-keyword").type("ca");

    cy.get(".products").as("productLabel");

    cy.get("@productLabel")
      .find(".product")
      .each(($el, index, $list) => {
        const productName = $el.find(".product-name").text();
        if (productName.includes("Cashews")) {
          cy.wrap($el).find("button").click();
        }
      });

    cy.get(".cart-icon > img").click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.url().should("include", "/cart");
    cy.contains("Place Order").click();
    cy.url().should("include", "/country");
  });
});
