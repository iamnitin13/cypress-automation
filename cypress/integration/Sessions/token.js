/// <reference types="cypress" />
const neatCSV = require("neat-csv");

describe("JWT Session", () => {
  before(() => {
    cy.LoginApi().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        // onbeforeLoad event is called before the  page has loaded all of its resources.
        onBeforeLoad: () => {
          // write js code to set token in localstorage in browser
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
  });

  it("should purchase a product", function () {
    cy.get(".card-body h5")
      .eq(1)
      .then(function (product) {
        this.productName = product.text();
      });

    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get("[routerlink*=cart]").click();
    cy.contains("Checkout").click();

    cy.get("[placeholder*=country i]").type("ind");

    cy.get(".ta-results button").each(($el, index, $list) => {
      if ($el.text().trim() === "India") {
        cy.wrap($el).click();
      }
    });

    cy.get(".action__submit").click();

    cy.wait(2000); // not required in real-time; waiting for csv file to be downloaded

    cy.get(".order-summary .btn-primary").click();

    // anything download through cypress on web during automation will be stored in downloads folder inside cypress project;
    // install neat-csv v5 only; it return js object  & now vaidate the productname

    // readFile convert file into text format & Cypress.config('fileServerFolder') return path of your root folder default config give by cypress
    cy.readFile(
      `${Cypress.config(
        "fileServerFolder"
      )}/cypress/downloads/order-invoice_test01.csv`
    ).then(async function (text) {
      // resolve promise
      const csv = await neatCSV(text);
      expect(this.productName).to.equal(csv[0]["Product Name"]);
    });
  });
});
