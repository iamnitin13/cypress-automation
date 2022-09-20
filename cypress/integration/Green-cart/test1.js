/// <reference types="cypress" />

// READ DO : yields in cypress yield will yield subject from one command to next during execution ;
// as cypress is async it ququed execution for later time ; so to maintain the order yield is used in cyprss;

// READ DO : subject in cypress is an object getting from cypress locator

describe("My FirstTest Suite", () => {
  it("My FirstTest Case", () => {
    cy.visit(`${Cypress.env("url")}/seleniumPractise/#/`);

    cy.get(".search-keyword").type("ca");
    // cy.get(".product:visible").should("have.length", 4); //jquery css selector
    // cy.get(".products .product").should("have.length", 4); // parent child selector

    // READ DO : make alias of locator using as command & use it using @aliasName in get command
    cy.get(".products").as("productLabel");

    // READ DO : parent child chaining using cypress find command
    cy.get("@productLabel").find(".product").should("have.length", 4);

    // READ DO : click on add to cart for search product 2nd item using nth-child (not ideal if in future new item get added it will show incorrect result)
    // READ DO : cy.get(".products>.product:nth-child(2)").find(">.product-action>button").click();

    //using eq command index from 0
    cy.get("@productLabel")
      .find(".product")
      .eq(1)
      .contains("ADD TO CART")
      .click();

    // READ DO : iterate on the resulted list that we searched for using each command
    cy.get("@productLabel")
      .find(".product")
      .each(($el, index, $list) => {
        // READ DO : each command 3 parameter elemnt,index,list
        // READ DO : type is not cypress command it is jquery selector
        const productName = $el.find(".product-name").text();
        if (productName.includes("Cashews")) {
          // READ DO : $el.find("button").click(); as  $el is a wrapped jQuery element so click is depricted for that.
          cy.wrap($el).find("button").click(); // READ DO : use cy.wrap to use cypress click command & it also resolved promise
        }
      });

    // assert logo text is correct displayed
    cy.get(".brand").should("have.text", "GREENKART");

    // READ DO : cypress command parent child chaining parent command internally resolved promise & then passon to child command
    // READ DO : cypress command are async in nature it hanlde promise itself

    // print log after resolving manually promise
    cy.get(".brand").then((logoitem) => {
      const logoText = logoitem.text();
      cy.log(logoText);
    });
  });
});
