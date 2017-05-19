(function(){

  'use strict';

  angular
    .module('app.shell', [])
    .config(configuration);

  function configuration($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('shell', {
      url: '',
      abstract: true,
      title: 'Demo',
      views: {
        '@': {
          templateUrl: 'app/shell/shell.html',
          controller: 'Shell as vm'
        },
        'top@shell': {
          templateUrl: 'app/shell/top.html',
          controller: 'Top as vm'
        },
        'bottom@shell': {
          templateUrl: 'app/shell/bottom.html',
          controller: 'Bottom as vm'
        }
      }
     })
    .state('shell.forbidden', {
      url: '/forbidden',
      title: 'Forbidden',
      views: {
        'content@shell': {
          templateUrl: 'app/shell/403.html'
        },
        'top@shell': {
          templateUrl: 'app/shell/top.html',
          controller: 'Top as vm'
        },
        'bottom@shell': {
          templateUrl: 'app/shell/bottom.html',
          controller: 'Bottom as vm'
        }
      }
     });
    
    $urlRouterProvider.otherwise('/home');
  }

}());