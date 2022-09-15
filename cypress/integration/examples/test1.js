/// <reference types="cypress" />

describe("My FirstTest Suite", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });
  it("My FirstTest Case", () => {
    cy.get(".search-keyword").type("ca");
    // cy.get(".product:visible").should("have.length", 4); //jquery css selector
    // cy.get(".products .product").should("have.length", 4); // parent child selector

    // make alias of locator using as command & use it using @aliasName in get command
    cy.get(".products").as("productLabel");

    // parent child chaining using cypress find command
    cy.get("@productLabel").find(".product").should("have.length", 4);

    // click on add to cart for search product 2nd item using nth-child (not ideal if in future new item get added it will show incorrect result)
    // cy.get(".products>.product:nth-child(2)").find(">.product-action>button").click();

    //using eq command index from 0
    cy.get("@productLabel")
      .find(".product")
      .eq(1)
      .contains("ADD TO CART")
      .click();

    // iterate on the resulted list that we searched for using each command
    cy.get("@productLabel")
      .find(".product")
      .each(($el, index, $list) => {
        // each command 3 parameter elemnt,index,list
        // type is not cypress command it is jquery selector
        const productName = $el.find(".product-name").text();
        if (productName.includes("Cashews")) {
          // $el.find("button").click(); // as  $el is a wrapped jQuery element so click is depricted for that.
          cy.wrap($el).find("button").click(); // use cy.wrap to use cypress click command & it also resolved promise
        }
      });

    // assert logo text is correct displayed
    cy.get(".brand").should("have.text", "GREENKART");

    // cypress command parent child chaining parent command internally resolved promise & then passon to child command
    // cypress command are async in nature it hanlde promise itself

    // print log after resolving manually promise
    cy.get(".brand").then((logoitem) => {
      const logoText = logoitem.text();
      cy.log(logoText);
    });
  });
});
