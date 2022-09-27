const ProductPage = require("../support/pageObjects/ProductPage");

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This will select given product & add it to car --
Cypress.Commands.add("selectProduct", (productName) => {
  const shopPage = new ProductPage();
  shopPage.getPhoneTitle().each(($el, index, $list) => {
    if ($el.text().includes(productName)) {
      shopPage.addButton().eq(index).click();
    }
  });
});

Cypress.Commands.add("LoginApi", () => {
  cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", {
    userEmail: Cypress.env("EMAIL"),
    userPassword: Cypress.env("PSWD"),
  }).then((response) => {
    expect(response.status).to.equal(200);
    Cypress.env("token", response.body.token);
  });
});
