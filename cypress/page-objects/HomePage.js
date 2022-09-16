export default class HomePage {
  getEditBox() {
    return cy.get(":nth-child(1)>.form-control");
  }

  getTwoWayDataBinding() {
    return cy.get("h4 input[name=name]");
  }

  getGender() {
    return cy.get("form select");
  }

  getEntrepreneur() {
    return cy.get("#inlineRadio3");
  }

  getShopTab() {
    return cy.get(":nth-child(2) > .nav-link");
  }
}
