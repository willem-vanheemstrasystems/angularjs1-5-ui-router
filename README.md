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

See script.js, index.html and styles.css how to implement this.