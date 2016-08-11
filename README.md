# angularjs1-5-ui-router
AngularJS 1.5 UI-Router

Based on 'UI-Router' at https://www.youtube.com/watch?v=2jnrl5aT3A8&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=42

#ui-router

##What is ui-router
1. The UI-Router is a thord party routing framework for AngularJS
2. ```ui-router``` implements routing based on the ***state*** of the application, whereas ```ngRoute``` implements routing based on the route URL

##CDN link for ui-router can be found here:
https://cdnjs.com/libraries/angular-ui-router

##Three steps to include ui-router in your angular application:

1. Reference the ***ui-router*** CDN link

```javascript
<head>
    <meta charset="UTF-8">
    <title>My Angular App</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.js"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>-->
    <script src="script.js"></script>
</head>
```

2. Add ***ui.router*** as a module dependency (remove ngRoute)
Note: by removing ngRoute, the ```$routeProvider``` service is no longer available. 
Use instead the ```$stateProvider``` service.

```javascript
var myApp = angular
    .module("myModule", ["ui.router"])
    .config(function($stateProvider) {
    
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: "homeCtrl",
                controllerAs: "ctrl"
            })
    [...]
```

Note: by removing ngRoute, the ```route``` service is no longer available.
Use instead the ```$state``` service.

```javascript
    [...]
    .controller("studentsCtrl", function(studentsList, $state, $location) {

        var vm = this;

        vm.searchStudent = function() {
            if(vm.name) {
                $location.url("/studentsSearch/" + vm.name);
            }
            else {
                $location.url("/studentsSearch");
            }
        }

        vm.reloadData = function() {
            $state.reload();
        }

        vm.students = studentsList;
    [...]
```

3. Add ***ui-view*** directive in the layout page (remove ng-view), and use ```ui-sref``` directives in the links instead of 'href', where the value is the name of the state (not the URL).

```javascript
    [...]
    <td class="leftMenu">
        <a ui-sref="home">Home</a>
        <a ui-sref="courses">Courses</a>
        <a ui-sref="students">Students</a>
    </td>
    <td class="mainContent">
        <ui-view></ui-view>
    </td>
    [...]
```

#Configuring states

Based on 'UI-Router configuring states' at https://www.youtube.com/watch?v=xTCC5y6Ey_U&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=43

A ***state*** corresponds to a "place" in the application.

To configure a state, use the ```state()``` method of the ```$stateProvider``` service 

```javascript
$stateProvider.state(stateName, stateConfig);
```

```javascript
// Configuring home state
$stateProvider
    .state("home", {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "homeCtrl",
        controllerAs: "ctrl"
    })
    [...]
```

#UI-Router Parameters

Based on 'UI-Router Parameters' at https://www.youtube.com/watch?v=XRdi54tYtU4&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=44

Three steps to use URL parameters with ui-router:

Step 1. Define the state with ```url``` parameter

```javascript
    [...]
    .state("studentDetails", {
        url: "/students/:id",
        templateUrl: "templates/studentDetails.html",
        controller: "studentDetailsCtrl",
        controllerAs: "ctrl"
    })
```

Step 2. Link to the state with ```url``` parameter

```javascript
[...]
<ul>
    <li data-ng-repeat="student in ctrl.students">
        <a data-ui-sref="studentDetails({id: student.id })">
            {{ student.name }}
        </a>
    </li>
</ul>
[...]
```

Step 3. Access ```url``` parameters, using ```$stateParams``` (instead of $routeParams)

```javascript
    .controller("studentDetailsCtrl", function($http, $stateParams) {
         var vm = this;
         // $http({
         //   url: "StudentsService/GetStudent",
         //   params: {id:$stateParams.id},
         //   method: "get"
         // })
         // .then(function(response) {
         //   vm.student = response.data;
         // }, function(reason) {
         //   vm.error = reason.data;
         // });
         var students = [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
         vm.student = students[$stateParams.id-1];
    })
```

#UI-Router Optional Parameters

Based on 'UI-Router Optional Parameters' at https://www.youtube.com/watch?v=sjDmmcARWCE&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=45

With ```ngRoute``` module to make a parameter optional, we include a question mark (?) at the end of the parameter name.
With ```ui-router``` the parameters are optional by default, so there is nothing special that we have to do.

Step 1. Define studentsSearch state

```javascript
    .state("studentsSearch", {
        url: "/studentsSearch/:name",
        templateUrl: "templates/studentsSearch.html",
        controller: "studentsSearchCtrl",
        controllerAs: "ctrl"
    })
```

Step 2. Modify studentsSearch() function that gets called when the search button is clicked.

```javascript
    [...]
    .controller("studentsCtrl", function(studentsList, $state) {

        var vm = this;

        vm.searchStudent = function() {
            $state.go("studentsSearch", {name: vm.name});
        }

        vm.reloadData = function() {
            $state.reload();
        }

        vm.students = studentsList;
    })
```

Step 3. Modify studentsSearch controller function to retrieve name URL parameter value.

```javascript
    .controller("studentsSearchCtrl", function($http, $stateParams, $log) {
        var vm = this;
        // Check is a 'name' parameters is in the URL
        if($stateParams.name) {
            // $http({
            //   url: "StudentsService/GetStudentsByName",
            //   params: {name: $stateParams.name},
            //   method: "get"
            // })
            // .then(function(response) {
            //   vm.student = response.data;
            // }, function(reason) {
            //   vm.error = reason.data
            // });
            var students = [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
            // Use a filter method to retrieve only those students whose name match with the name provided in the URL
            function filterStudentsByName(student) {
                $log.debug(student);
                // Check if the name in the param is a substring of the student name
                return student.name.toUpperCase().indexOf($stateParams.name.toUpperCase()) >= 0;
            }
            var matchingStudents = students.filter(filterStudentsByName);
            $log.debug(matchingStudents);
            vm.students = matchingStudents;
        }
        else {
            // $http.get("StudentsService/GetAllStudents")
            //      .then(function(response) {
            //            vm.students = response.data;
            //       }, function(reason) {
            //            vm.error = reason.data;
            //       });
            vm.students = [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
        }
    });
```

#Programmatically activating a state using ```$state``` service ```go()``` method

See example above.
```javascript
    [...]
    vm.searchStudent = function() {
        $state.go("studentsSearch", {name: vm.name});
    }
```

#Case sensitivity with ui router

Based on 'Case sensitivity with ui router' at https://www.youtube.com/watch?v=cJ9PhXKS7zU&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=46

Routes that are configured using ```ui-router``` are case-sensitive by default.

To make the routes case-insensitive inject ```$urlMatcherFactoryProvider``` service into the config() function and call ```caseInsensitive(true)``` function.

```javascript
var myApp = angular
    .module("myModule", ["ui.router"])
    .config(function($stateProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
    [...]
```

#Default route with ui router

Based on 'Default route with ui router' at https://www.youtube.com/watch?v=DJreBFFDGBo&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=47

To configure the default route when you are using ```ui-router```, inject ```$urlRouterProvider``` service into the config() function and use ```otherwise()``` function passing it the default route.

```javascript
var myApp = angular
    .module("myModule", ["ui.router"])
    .config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        [...]
```

#Custom data with ui router

Based on 'Custom data with ui router' at https://www.youtube.com/watch?v=NF4IInqy-00&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=48

To add custom data to a state, use ```data``` property

```javascript
    [...]
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "homeCtrl",
            controllerAs: "ctrl",
            data: {
                customData1: "Home State Custom Data 1",
                customData2: "Home State Custom Data 2"
            }
        })
```

Custom data is now available in all the home controller functions.

```javascript
    .controller("homeCtrl", function($state) {
        var vm = this;
        vm.pageTitle = "Home";
        vm.homeCustomData1 = $state.current.data.customData1;
        vm.homeCustomData2 = $state.current.data.customData2;
        // Access the custom data of the 'courses' state
        vm.coursesCustomData1 = $state.get("courses").data.customData1;
        vm.coursesCustomData2 = $state.get("courses").data.customData2;
    })
```

This can now be displayed on the 'home' view

```javascript
    <fieldset>
        <legend>Home</legend>
        Custom Data 1 : {{ ctrl.homeCustomData1 }}
        <br />
        Custom Data 2 : {{ ctrl.homeCustomData2 }}
    </fieldset>
    
    <fieldset>
        <legend>Courses</legend>
        Custom Data 1 : {{ ctrl.coursesCustomData1 }}
        <br />
        Custom Data 2 : {{ ctrl.coursesCustomData2 }}
    </fieldset>
```

See scriptA.js, indexA.html and stylesA.css how to implement this.

#html5Mode with ui router

Based on 'html5Mode with ui router' at https://www.youtube.com/watch?v=I3QZC0y9_nw&index=49&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl

Step 1: Enable html5Mode routing

```javascript
var myApp = angular
    .module("myModule", ["ui.router"])
    .config(function($locationProvider, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        [...]
```

Step 2: Remove # symbols from the URLs

As we are using ```ui-sref``` with ui router we do ***not*** have # symbols. 
Therefore this step is ***not*** applicable when using ui router.

Step 3: Include the following URL rewrite rule in web.config

```javascript
<system.webServer>
    <rewrite>
        <rules>
            <rule name="RewriteRules" stopProcessing="true">
                <match url=".*" />
                <conditions logicalGrouping="MatchAll">
                    <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
                </conditions>
                <action type="Rewrite" url="/indexB.html" />
            </rule>
        </rules>
    </rewrite>
</system.webServer>
```

Step 4: Set the base href to the location of your layout page. 
Note: make sure to place the base href BEFORE the links to scripts and/or stylesheets.

```javascript
<base href="/" />
```

See scriptB.js, indexB.html and stylesB.css how to implement this.

#ui router active state css

Based on 'ui router active state css' at https://www.youtube.com/watch?v=Dl8j6fOP07I&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=50

How to highlight the navigation menu item if the user is currently on that page.

Step 1. Create an activeState class in the styles.css file

```javascript
[...]
.activeState {
    background-color: black;
    color: white;
}
```

Step 2. Add the ui-sref-active directive to all the links on the page, with a value of the class created in step 1.

```javascript
    [...]
    <a ui-sref="home" ui-sref-active="activeState">Home</a>
    [...]
```

See scriptC.js, indexC.html and stylesC.css how to implement this.

#nested view with ui router

Based on 'nested views ui router' at https://www.youtube.com/watch?v=rT5HauC4cQg&index=51&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl

Two common methods:

Using dot notation
```javascript
.state("studentParent", {
    // parent state config properties
})
.state("studentParent.students", {
    // child state config properties
})
```

Using the 'parent' property with the parent name as string
```javascript
.state("studentParent", {
    // parent state config properties
})
.state("students", {
    parent: "studentParent"
    // child state config properties
})
```

Step 1: Create the service that will return the total of Males, Females and Grand Total.
Note: this code is not included here, watch the video how to implement this.

Step 2: In scriptD.js create a "studentParent" state, which will be the parent for "students" and "studentDetails" state.

```javascript
    .state("studentParent", {
        url: "/students",
        controller: "studentParentCtrl",
        controllerAs: "ctrl",
        templateUrl: "templates/studentParentE.html",
        resolve: {
            studentTotals: function ($http) {
                //return $http.get("StudentService.asmx/GetStudentTotals")
                //    .then(function(response) {
                //        return response.data;
                //    })
    
                // Mimicking a return over http
                return {total: 3, males: 2, female: 1};
            }
        },
        abstract: true
    })
```

The URL of the parent state is prepended to the URL of all the child states.
That means we can remove any redundant part from the child states URLs.
All the data in the parent state will be available in the child states.

About '***abstract***' state:

- When a child state is created, its parent state is implicitly created as well (if it is set to abstract true).

- When a child state is activated, its parent state is implicitly activated as well (if it is set to abstract true).

Step 3: In scriptD.js, modify students and studentDetails to be child states, by prepending the parent state name to the state name using the dot notation.

```javascript
    .state("studentParent.students", {
        url: "/",
        templateUrl: "templates/students.html",
        controller: "studentsCtrl",
        controllerAs: "ctrl",
        resolve: {
            // A function that returns a promise
            studentsList: function($http) {
                // return $http.get("StudentsService/GetAllStudents")
                //      .then(function(response) {
                //            return response.data;
                //       }, function(reason) {
                //            return reason.data;
                //       });
                return [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
            }
        }
    })
    .state("studentParent.studentDetails", {
        url: "/:id",
        templateUrl: "templates/studentDetails.html",
        controller: "studentDetailsCtrl",
        controllerAs: "ctrl"
    })
```

Notice above that the urls have been trimmed (e.g not /students/:id, but /:id) as the parent state already has the url '/students'.

Step 4: In scriptD.js, create studentParentController function

```javascript
.controller("studentParentController", function(studentTotals) {
    var vm = this;
    
    vm.males = studentTotals.males;
    vm.females = studentTotals.females;
    vm.total = studentTotals.total;
})
```

Step 5: Create a studentParentE.html template

```javascript
<h3>Total Male Students: {{ ctrl.males }}</h3>
<h3>Total Female Students: {{ ctrl.females }}</h3>
<h3>Grand Total: {{ ctrl.total }}</h3>

<ui-view></ui-view>
```

Step 6: In indexD.html, modify the students link by prepending it with studentParent

```javascript
    [...]
    <a ui-sref="studentParent.students" ui-sref-active="activeState">Students</a>
    [...]
```

Step 7: In studentsD.html, modify the individual student's link by prepending it with studentParent

```javascript
    [...]
    <ul>
        <li data-ng-repeat="student in ctrl.students">
            <a data-ui-sref="studentParent.studentDetails({id: student.id })">
                {{ student.name }}
            </a>
        </li>
    </ul>
    [...]
```

Step 8: In studentDetailsD.html, modify the "Back to Students" link by prepending it with studentParent

```javascript
[...]
<a data-ui-sref="studentParent.students">Back to Students list</a>
```

Step 9: The parent state resolved dependencies are available to child states. To prove this, we want to display the total number of students on the students page against the List of Students text.

Inject ```studentTotals``` into students controller function.

```javascript
   .controller("studentsCtrl", function(studentsList, $state, studentTotals) {

        var vm = this;

        vm.searchStudent = function() {
            $state.go("studentsSearch", {name: vm.name});
        }

        vm.reloadData = function() {
            $state.reload();
        }

        vm.students = studentsList;
        
        vm.studentTotals = studentTotals;
    })
```

In ```students.html```, display the student total

```javascript
<h1>
    List of Students ({{ ctrl.studentTotals.total }})
</h1>
```

See scriptD.js, indexD.html and stylesD.css how to implement this.

#Multiple named views with ui router

Based on 'multiple named views with ui router' at https://www.youtube.com/watch?v=G6rB5-SSan4&index=52&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl

Note: ngRoute does ***not*** support multiple named views, whereas ui router does.

Step 1: In studentParentE.html, modify the ui-view element to the following
 
```javascript
    [...]
    <div data-ui-view="totalData"></div>
    <div data-ui-view="studentData"></div>
    [...]
```

Step 2: Include the ```views``` property in the "students" state and nest each view inside

```javascript
    [...]
    .state("studentParent.students", {
        url: "/",
        views: {
            "studentData" : {
                templateUrl: "templates/studentsE.html",
                controller: "studentsCtrl",
                controllerAs: "ctrl",
                resolve: {
                    // A function that returns a promise
                    studentsList: function($http) {
                        // return $http.get("StudentsService/GetAllStudents")
                        //      .then(function(response) {
                        //            return response.data;
                        //       }, function(reason) {
                        //            return reason.data;
                        //       });
                        return [{ id: 1, name: "Ben", gender: "Male", city: "London" }, { id: 2, name: "Matt", gender: "Male", city: "New York" }, { id: 3, name: "Pam", gender: "Female", city: "Chennai" }];
                    }
                }
            },
            "totalData" : {
                templateUrl: "templates/studentsTotalE.html",
                controller: "studentsTotalCtrl",
                controllerAs: "ctrl"
            }
        }
    })
```

Step 3: Add a "studentsTotalCtrl" controller to scriptE.js

```
    [...]
    .controller("studentsTotalCtrl", function(studentTotals) {
        var vm = this;
        vm.total = studentTotals.total;
    })
    [...]
```

Step 4: Create a "studentsTotalE.html" template

```javascript
    <h3>Grand Total : {{ ctrl.total }}</h3>
```

Step 5: Include the ```views``` property in the "studentDetails" state and nest each view inside

```javascript
    [...]
    .state("studentParent.studentDetails", {
        url: "/:id",
        views: {
            "studentData": {
                templateUrl: "templates/studentDetailsE.html",
                controller: "studentDetailsCtrl",
                controllerAs: "ctrl"
            }
        }
    })
    [...]
```

See scriptE.js, indexE.html and stylesE.css how to implement this.

#Difference between ngRoute and ui-router

Based on 'Difference between ngRoute and ui-router' at https://www.youtube.com/watch?v=GEZAZpyWHVk&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl&index=53

- ngRoute is developed by the Angular team, whereas ui-router is a 3rd-party module
- ngRoute implements routing based on the route URL, whereas ui-router implements routing based on the state of the application
- ui-router provides everything that the ngRoute module provides plus the following features:
-- Nested states and views
-- Multiple named views