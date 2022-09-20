1. READ DO : page object design pattern
2. PODP - collect object from specfic page & write them to specfic class & export that class;
3. all the object of specfic page will in js class & declare all the object in that class inside method & return them
4. all the testcase have access of that object in the class; import specfic class create object for the class & access the specfic method

5. NOTE: method name must be generic & readable

6. running particular spec file & assigning different env vaiable from cypress cli
   npx cypress run --spec cypress/integration/framework-tests/homepage.js --env url='${website url}' --headed
