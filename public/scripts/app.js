console.log("app.js linked!");


angular
  .module('movelog', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/landing',
      controllerAs: 'usersIndexCtrl',
      controller: 'UsersIndexController'
    })
    .when('/users', {
      templateUrl: '/templates/users',
      controllerAs: 'usersIndexCtrl',
      controller: 'UsersIndexController'
    })
    .when('/users/:id', {
      templateUrl: '/templates/users-show',
      controllerAs: 'usersShowCtrl',
      controller: 'UsersShowController'
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
}
