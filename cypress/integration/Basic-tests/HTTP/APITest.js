/// <reference types="cypress" />

describe("My API TESTING SUITE", () => {
  it("should test pure api testing", () => {
    //cy.request(method,url,body) to send http request without ui pure api testing
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation with Java",
      isbn: "bcdsss",
      aisle: "22s7",
      author: "John foe",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Msg", "successfully added");
    });
  });
});
