angular.module('WarRoom')
.controller('HomeController', ['$scope', '$rootScope', '$http', '$timeout', 'SettingsService', function($scope, $rootScope, $http, $timeout, SettingsService){
  $scope.servers = [];
  var socket = io();
  socket.on('servers', function(data){
    console.log(data);
    $scope.servers = data.data;
    $scope.$apply();
  });
  $scope.warning = function(){
    return (parseInt(SettingsService.getThresholds().warning) / 1000);
  };
  $scope.critical = function(){
    return (parseInt(SettingsService.getThresholds().critical) / 1000);
  };
}])
.controller('ServerController', ['$scope', '$rootScope', '$routeParams','SettingsService', function($scope, $rootScope, $routeParams, SettingsService){
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
  $scope.warning = SettingsService.warningThreshold / 1000;
  $scope.critical = SettingsService.criticalThreshold / 1000;
}])
.controller('SettingsController', ['$scope', 'SettingsService', function($scope, SettingsService){
  $scope.greeting = "hello";
  $scope.warning = function(){
    return (SettingsService.getThresholds().warning / 1000);
  };
  $scope.critical = function(){
    return (SettingsService.getThresholds().critical / 1000);
  };
  $scope.setSettings = function(){
    SettingsService.setThresholds($scope.warning, $scope.critical);
    // SettingsService.warningThreshold = $scope.settings.warningThreshold;
    // SettingsService.criticalThreshold = $scope.settings.criticalThreshold;
  }
}])
