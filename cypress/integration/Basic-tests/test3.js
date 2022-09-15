/// <reference types="cypress" />

// READ DO : whenever perform operation check assertion to check op is successfull or not

describe("HTML Element Test Suite", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });

  // checkbox testing
  it("should test checkbox checked and unchecked", () => {
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked") // READ DO : behavioural use be. & for comparsion use have. with actual value to compare
      .and("have.value", "option1");

    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");

    // check by passing value property
    cy.get("input[type=checkbox]")
      .check(["option1", "option3"]) // READ DO : pass multiple checkboxes with their option that need to check
      .should("be.checked");
  });

  //  radio testing
  it("should test checkbox checked and unchecked", () => {
    cy.get("input[value=radio1]").check().should("be.checked"); //check radio1

    // check radio1 & verify radio1 is uncheck or not
    cy.get("input[value=radio2]").check().should("be.checked");
    cy.get("input[value=radio1]").should("not.be.checked");
  });

  // dropdown testing
  it("should test static dropdown", () => {
    cy.get("select").select("option1").should("have.value", "option1"); // READ DO : pass option value or text or index to select
  });

  // autosuggest dropdown testing
  it("should test autosuggest dropdown", () => {
    cy.get("#autocomplete").as("auto-complete").type("ind");

    // getting the resulted list containg searched value
    cy.get(".ui-menu-item div").each(($el, index, $list) => {
      if ($el.text() === "India") {
        cy.wrap($el).click();
      }
    });

    // assert the #autocomplete should have India as a value;
    cy.get("@auto-complete").should("have.value", "India");
  });

  // visible & hide elemenet testing
  it("should test visible and hidden element", () => {
    // visible
    cy.get("#displayed-text").as("text").should("be.visible");

    // hide element
    cy.get("#hide-textbox").click();
    cy.get("@text").as("display-text").should("not.be.visible");

    // show element
    cy.get("#show-textbox").click();
    cy.get("@text").should("be.visible");
  });
});
