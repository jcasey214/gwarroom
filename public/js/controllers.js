angular.module('WarRoom')
.controller('HomeController', ['$scope', '$rootScope', '$http', '$timeout', function($scope, $rootScope, $http, $timeout){
  $scope.servers = [];
  var socket = io();
  socket.on('servers', function(data){
    console.log(data);
    $scope.servers = data.data;
    $scope.$apply();
  });
}])
.controller('ServerController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
  $scope.greeting = "goodbye world";
}])
