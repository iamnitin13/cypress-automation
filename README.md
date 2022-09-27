1.  READ DO : page object design pattern
2.  PODP - collect object from specfic page & write them to specfic class & export that class;
3.  all the object of specfic page will in js class & declare all the object in that class inside method & return them
4.  all the testcase have access of that object in the class; import specfic class create object for the class & access the specfic method

5.  NOTE: method name must be generic & readable

6.  running particular spec file & assigning different env vaiable from cypress cli
    npx cypress run --spec cypress/integration/framework-tests/homepage.js --env url='${website url}' --headed

7.  Integration of Cucumber framework in cypress as a plugin(to support or extent the beahviour of cypress) to write Behaviour driven development

    The .feature file will use steps definitions from a directory with the same name as your .feature file

    example of feature
    --> .feature
    Scenario: Opening a Google network
    Given I open e-commerce page
    When i add item to cart
    And validate total price
    Then select country and submit

            // these are the feature & create a same name folder & a file to write the stepdefination

8.  Instead of using cypress fixture use cucumber dataTable in the feature spec
    example
    |name|gender|
    |bob|male|

    Each row is executed one time & before accessing data convert the dataTable in array using dataTable.rawTable //it is 2D array

9.  Tag Name is given to each Scenario to uniquly accessing & executing particular tagged Scenario

10. generate cucumber html reporter
    --> install package npm i --save-dev multiple-cucumber-html-reporter
    --> add below line in cypress-cucumber-preprocessor in package.json
    "cucumberJson": {
    "generate": true,
    "outputFolder": "cypress/cucumber-json",
    "filePrefix": "",
    "fileSuffix": ".cucumber"
    }
    --> run cucumber spec file it will generate json file in the given path
    --> create one cucumber-html-reporter.js file with some meta-data & run node filename
11. Install neat-csv package for parsing csv file.
