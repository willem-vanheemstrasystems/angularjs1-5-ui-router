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

See script.js, index.html and styles.css how to implement this.