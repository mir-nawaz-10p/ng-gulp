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
  
  function configuration($compileProvider){
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
  }

}());
