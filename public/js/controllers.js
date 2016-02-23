angular.module('WarRoom')
.controller('HomeController', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.greeting = "hello world";
}])
.controller('ServerController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
  $scope.greeting = "goodbye world";
}])
