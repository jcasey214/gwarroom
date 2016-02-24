var app = angular.module('WarRoom', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '../partials/home.html',
    controller: 'HomeController',
  }).when('/server/:id', {
    templateUrl: '../partials/server.html',
    controller: 'ServerController',
  }).when('/settings', {
    templateUrl: '../partials/settings.html',
    controller: 'SettingsController'
  }).otherwise({
    redirectTo: '/'
  })
});
