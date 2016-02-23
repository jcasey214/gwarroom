var app = angular.module('WarRoom', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '../partials/home.html',
    controller: 'HomeController',
  }).when('/:id', {
    templateUrl: '../partials/server.html',
    controller: 'ServerController',
  }).otherwise({
    redirectTo: '/'
  })
});
