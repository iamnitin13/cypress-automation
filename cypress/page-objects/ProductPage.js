export default class ProductPage {
  getPhoneTitle() {
    return cy.get("h4.card-title");
  }

  addButton() {
    return cy.get("button.btn.btn-info");
  }

  checkoutButton() {
    return cy.get("#navbarResponsive li");
  }
}
