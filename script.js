var myApp = angular
    .module("myModule", ["ui.router"])
    .config(function($stateProvider) {
        // $routeProvider.caseInsensitiveMatch = true;

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: "homeCtrl",
                controllerAs: "ctrl"
            })
            .state("courses", {
                url: "/courses",
                templateUrl: "templates/courses.html",
                controller: "coursesCtrl",
                controllerAs: "ctrl"
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
            // .otherwise({
            //     redirectTo: "/home"
            // })
    })
    .controller("homeCtrl", function() {
        var vm = this;
        vm.pageTitle = "Home";
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

