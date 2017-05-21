(function(){

'use strict';

angular
.module('app.shell')
.controller('Bottom', Bottom);

function Bottom() {
  var vm = this;
  vm.message = 'Bottom';
}

}());