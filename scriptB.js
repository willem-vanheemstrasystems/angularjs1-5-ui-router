var myApp = angular
    .module("myModule", ["ui.router"])
    .config(function($locationProvider, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $locationProvider.html5Mode(true);

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
            .state("courses", {
                url: "/courses",
                templateUrl: "templates/courses.html",
                controller: "coursesCtrl",
                controllerAs: "ctrl",
                data: {
                    customData1: "Courses State Custom Data 1",
                    customData2: "Courses State Custom Data 2"
                }
            })
            .state("students", {
                url: "/students",
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
            .state("studentDetails", {
                url: "/students/:id",
                templateUrl: "templates/studentDetails.html",
                controller: "studentDetailsCtrl",
                controllerAs: "ctrl"
            })
            .state("studentsSearch", {
                url: "/studentsSearch/:name",
                templateUrl: "templates/studentsSearch.html",
                controller: "studentsSearchCtrl",
                controllerAs: "ctrl"
            })
    })
    .controller("homeCtrl", function($state) {
        var vm = this;
        vm.pageTitle = "Home";
        vm.homeCustomData1 = $state.current.data.customData1;
        vm.homeCustomData2 = $state.current.data.customData2;
        // Access the custom data of the 'courses' state
        vm.coursesCustomData1 = $state.get("courses").data.customData1;
        vm.coursesCustomData2 = $state.get("courses").data.customData2;
    })
    .controller("coursesCtrl", function($http) {
        var vm = this;
        // $http.get("CourseService/GetAllCourses")
        //      .then(function(response) {
        //            vm.courses = response.data;
        //       }, function(reason) {
        //            vm.error = reason.data;
        //       });
        vm.courses = [{ id: 1, name: "Ruby" }, { id: 2, name: "JavaScript" }, { id: 3, name: "Python" }];
    })
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

