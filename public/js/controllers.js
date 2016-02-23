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
  $scope.server;
  var socket = io();
  socket.on('servers', function(data){
    for(var i = 0; i < data.data.length; i += 1){
      if(parseInt($routeParams.id) == data.data[i].id){
        console.log(data.data[i]);
        $scope.server = data.data[i];
        $scope.$apply();
      }
    }
  });
}])
