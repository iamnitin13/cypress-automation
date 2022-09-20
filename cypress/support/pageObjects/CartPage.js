export default class CartPage {
  productPrice() {
    return cy.get("tr td:nth-last-child(2) strong");
  }

  totalPrice() {
    return cy.get("h3 strong");
  }

  purchaseProduct() {
    return cy.contains("Checkout");
  }

  countryName() {
    return cy.get("#country");
  }

  autoSuggestionDropDown() {
    return cy.get(".suggestions > ul > li > a", { timeout: 8 * 1000 });
  }

  termsCheckbox() {
    return cy.get("#checkbox2");
  }

  submit() {
    return cy.get("input[type=submit]");
  }

  alertMessage() {
    return cy.get(".alert");
  }
}
