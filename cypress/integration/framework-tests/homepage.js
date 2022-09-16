/// <reference types="cypress"/>
import HomePage from "../../page-objects/HomePage";
import ProductPage from "../../page-objects/ProductPage";

// READ DO : cypress provide a feature known as fixture which store external data or api response in json format & can be imported easliy
describe("Framework related testsuite", () => {
  let userData;
  const homePage = new HomePage();
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.visit("https://www.rahulshettyacademy.com/angularpractice/");

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
  });
});
