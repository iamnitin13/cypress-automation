Feature: End to End Ecommerce Validation

    application regression
    @Regression
    Scenario: Ecommerce product delivery
    Given I open Ecommerce Page
    When I add item to cart
    And Validate the total prices
    Then Select the country submit and verify Thankyou message

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce Page
    When I fill the form details
    |name|gender|
    |bob|Male|
    Then Validate the form behaviour
    And Select the Shop page