import angular from 'angular';
import 'angular-route';

import mainController from './controllers/mainController';
import loginController from './controllers/loginController';

import apiService from './services/apiService';

const ewapp = angular.module('ewapp', ['ngRoute']);

ewapp.controller('mainController', mainController);
ewapp.controller('loginController', loginController);
ewapp.service('api', apiService);

ewapp.config([
  '$routeProvider',
  '$httpProvider',
  ($routeProvider, $httpProvider) => {
    $routeProvider.when('/main', {
      templateUrl: 'src/views/main.html',
      controller: 'mainController'
    }).when('/', {
      templateUrl: 'src/views/login.html',
      controller: 'loginController'
    }).otherwise({redirectTo: '/'});

    $httpProvider.defaults.withCredentials = true;
  }
]);
