/// <reference types="cypress" />
describe("Basic Desktop Tests UnAuthorised", () => {
  beforeEach(() => {
    // bootstrapping the external things
    cy.viewport(1280, 720); // setting the viewport
    cy.visit("https://codedamn.com");
  });

  // it("should test sample testcases", () => {
  // way1 wrong it would be fail if we update the text
  // cy.contains("Learn Programming");
  // should is used as a assertion
  // cy.get("[data-testid=logo] span").should("have.text", "codedamn");
  // cy.get get element by css selector
  // way2 selecting by class name failed in production if use css modules where they have garbage class name;
  // cy.get("div#root");
  // cy.get("div[id=root]");
  // way3 selecting custom attribute;
  // cy.get("[data-testid=logo]");
  // cy.get("[data-bypassmenuclose]").click();
  // });

  // testcase for small device
  // it("Basic test on mobile device", () => {
  //   cy.viewport("iphone-8");

  //   cy.visit("https://codedamn.com");

  //   cy.get("[data-bypassmenuclose]").click();
  // });

  it("should test login page display properly", () => {
    cy.contains("Sign in").click();

    // Sign in to codedamn should exits
    cy.contains("Sign in to codedamn").should("exist");

    // Forgot your password? should exits
    cy.contains("Forgot your password?").should("exist");

    // Don't have an account? should exit
    cy.contains("Don't have an account?").should("exist");

    // login with google oauth button should exit
    cy.get("[data-testid=google-oauth-btn").should("exist");

    // login with github oauth button should exit
    cy.get("[data-testid=github-oauth-btn").should("exist");
  });

  it("should test login page urls", () => {
    // 1. Signin page
    cy.contains("Sign in").click();

    // logging in cypress

    cy.log("logging before forgot password");

    // 2. Forgot password page
    cy.contains("Forgot your password?").click({ force: true }); //force true will disable the warning for covered element and will perform click action

    // 3. verify your page url
    cy.url().should("include", "/password-reset");

    // 4. go back, on the signin page
    cy.go("back");

    cy.contains("Create one").click();

    cy.url().should("include", "/register");
  });

  it("should test login display error", () => {
    cy.contains("Sign in").click();
    cy.contains("Unable to authorize").should("not.exist");
    // type username & password
    cy.get("[id=email][data-testid=username]").type("admin", {
      force: true,
    });
    cy.get("[id=password][data-testid=password]").type("admin", {
      force: true,
    });
    cy.get("[data-testid=login]").click({ force: true });

    cy.contains("Unable to authorize").should("exist");
  });

  it("should test login flow", () => {
    //setting token in localstorage for testing

    cy.contains("Sign in").click();
    // type username & password
    cy.get("[id=email][data-testid=username]").type("useradmin", {
      force: true,
    });
    cy.get("[id=password][data-testid=password]").type("Admin@123$99", {
      force: true,
    });
    cy.get("[data-testid=login]").click({ force: true });

    cy.url().should("include", "/dashboard");
  });
});
