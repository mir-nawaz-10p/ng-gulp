(function(){

  'use strict';

  angular
  .module('app', [
    'app.core',
	  /**
	    * Application modules
	  **/
    'app.shell',
    'app.home'
  ])
  .config(configuration);
  
  function configuration(){}

}());
