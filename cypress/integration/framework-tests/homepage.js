/// <reference types="cypress"/>
import HomePage from "../../support/pageObjects/HomePage";
import ProductPage from "../../support/pageObjects/ProductPage";
import CartPage from "../../support/pageObjects/CartPage";

// READ DO : cypress provide a feature known as fixture which store external data or api response in json format & can be imported easliy
describe("Framework related testsuite", () => {
  let userData;
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  before(() => {
    cy.visit(`${Cypress.env("url")}/angularpractice/`);

    // run once before all test in the block; should contain all the setup realted work
    cy.fixture("example.json").then(function (data) {
      // READ DO : above line is to load a fix external json data

      //globalThis.data = data; //gloabalTHis allows one to access the global object regardless of the enivornment
      userData = data;
    });
  });

  it("First sample testcase", () => {
    // replace all the locator with the class homepage method

    homePage.getEditBox().type(userData.name);
    homePage.getGender().select(userData.gender);

    // if our task is to assert directly use should assert ; else resolve promise & use jquery prop method
    // validate ngmodel is working or not;
    homePage.getTwoWayDataBinding().should("have.value", userData.name);

    // input name should have minlength attribute of 2
    homePage.getEditBox().should("have.attr", "minlength", "2");

    // validate Entrepreneur (disabled) radio is disabled or not
    homePage.getEntrepreneur().should("be.disabled"); // if it behaviour use be; else have
  });

  // READ DO : create custom command when same logic is beign used in multiple testcases

  it("Test add to cart usecase", () => {
    homePage.getShopTab().click();
    cy.url().should("include", "shop");

    // find common locator & iterate them and match the text;
    // use custom command create in support folder; use that command name & pass pramater(if need);

    // this is the parameterize with multiple data set
    userData.productName.forEach((product) => {
      cy.selectProduct(product);
    });

    // after adding product click on checkout
    productPage.checkoutButton().click();

    // check each product sum is equal to total product
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

    // on checkout page click to checkout
    cartPage.purchaseProduct().click();

    // purchase products
    cartPage.countryName().type("India");
    cartPage.autoSuggestionDropDown().click();
    cartPage.termsCheckbox().check({ force: true });
    cartPage.submit().click();

    cartPage.alertMessage().then(($el) => {
      expect($el.text().includes("Success")).to.be.true;
    });
  });
});
