(function(){

  'use strict';

  angular
    .module('app.home', [])
    .config(configuration);

  function configuration($stateProvider){

    $stateProvider
    .state('shell.home', {
      url: '/home',
      title: 'Home',
      views: {
        'content@shell': {
          templateUrl: 'app/home/home.html',
          controller: 'Home as vm'
        }
      }
     });
  }

}());