import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../../support/pageObjects/HomePage";
import ProductPage from "../../../../support/pageObjects/ProductPage";
import CartPage from "../../../../support/pageObjects/CartPage";

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();

// testing ecommerce page using cucumber feature & stepdefination

Given("I open Ecommerce Page", () => {
  cy.visit(`${Cypress.env("url")}/angularpractice/`);
});

When("I add item to cart", function () {
  homePage.getShopTab().click();
  cy.url().should("include", "shop");
  this.data.productName.forEach((product) => {
    cy.selectProduct(product);
  });
  productPage.checkoutButton().click();
});

And("Validate the total prices", () => {
  let amount = 0;
  cartPage
    .productPrice()
    .each(($el, index, $list) => {
      const price = +$el.text().split(" ")[1].trim();
      amount += price;
    })
    .then(() => {
      amount;
    });

  cartPage.totalPrice().then(($el) => {
    const price = +$el.text().split(" ")[1].trim();
    expect(price).to.equal(amount);
  });
});

Then("Select the country submit and verify Thankyou message", () => {
  cartPage.purchaseProduct().click();
  cartPage.countryName().type("India");
  cartPage.autoSuggestionDropDown().click();
  cartPage.termsCheckbox().check({ force: true });
  cartPage.submit().click();

  cartPage.alertMessage().then(($el) => {
    expect($el.text().includes("Success")).to.be.true;
  });
});

// testing form behaviour using cucumber feature & stepdefination

When("I fill the form details", function (dataTable) {
  this.data = dataTable.rawTable[1];
  cy.log(this.data);
  homePage.getEditBox().type(this.data[0]);
  homePage.getGender().select(this.data[1]);
});

Then("Validate the form behaviour", function () {
  homePage.getTwoWayDataBinding().should("have.value", this.data[0]);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  homePage.getEntrepreneur().should("be.disabled");
});

And("Select the Shop page", () => {
  homePage.getShopTab().click();
});
