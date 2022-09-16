/// <reference types="cypress" />

// READ DO : Cypress and cy objects are standard Node event emitters.
// READ DO : Cypress is a global object bound it all test-case, any event binding will not be unbound until manually unbind it.
// READ DO : cy is local object bound to individual test-case any event bind will be unbind after the test end
// READ DO : cypress have capability of maipulating DOM & give direction to the browser, no other framework this.

// advance html ui testing alert, popup, child window
describe("Advance HTML Element Test Suite", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });
  // alert  & pop testing
  it("should test alert & confirm popup", () => {
    // cypress automatically handle alert & popup
    cy.get("#alertbtn").click();
    cy.get("#confirmbtn").click();

    // READ DO : cypress can listen browser event (need to test alert & popup box)
    // READ DO : alert & popup automatically handled by cypress ;
    // no need to write test case just only verify pop or alert is handle by cypress by click on button that open op/alert box

    // window:alert use on cypress command to listen any browser event ( these event will be not show on ui, cypress handle them)
    cy.on("window:alert", (str) => {
      // str is o/p after the promise get resolved;
      // MOCHA framework provide assertion
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });

    // window:confirm
    cy.on("window:confirm", (str) => {
      // MOCHA assertion comparng two string
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
  });

  // switch tab testing
  it("should test switch tab", () => {
    // READ DO : cypress don't have any knowledge about switching tab cypres, will test it in different way;
    // as cypress architecture is design to restricted on the same browser for consistency
    // READ DO : mimic this on the same page (work around provided by cypress)

    cy.get("#opentab").invoke("removeAttr", "target").click(); // 1st method for testing switch tab|window
    cy.url().should("include", "rahulshettyacademy"); // READO DO: substring assertion
    cy.go("back"); // READ DO : broswer navigation backward|forward
  });

  // testing of particular table row adjacent text
  it("should test given course price in table", () => {
    // READ DO :second column child tr td:nth-child(2); course Name
    cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Python")) {
        // READ DO :use next command to get sibling of given DOM element

        // READ DO :cy.get("tr td:nth-child(2)").eq(index).next().should("have.text", "25"); // check for the fiest text in td

        // another way to resolve promise & use text() jquery property
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then((price) => {
            const priceText = price.text();
            expect(priceText).to.equal("25");
          });
      }
    });
  });

  // READ DO : mouse hover event is not handle by cyprees, but we can do that use jquery show method
  it("should test mouse hover", () => {
    // READ DO : show method shows the hidden & applied on immediate parent of hidden element(selected elements);
    // READ DO : not for invisible, for that use hide method
    cy.get("div.mouse-hover-content").invoke("show");
    /// cy.pause(); pause the test execution only not applicationn execution; later you can resume from dashboard
    cy.contains("Top").click();
    cy.url().should("include", "#top");
  });

  // switch tab|window testing
  it("should test switch window", () => {
    // READ DO : cypress not provide any method for switch tab|window
    // 2nd method we will grave attribute value & act upon them ;

    // not testing for openwindow as there is no href tag;
    cy.get("#opentab").then((el) => {
      const url = el.prop("href"); //prop jquery method to get element property
      cy.log(url);
      cy.visit(url); // will fail for cross-domain
    });
  });
});
