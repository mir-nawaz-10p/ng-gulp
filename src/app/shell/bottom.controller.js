(function(){

'use strict';

angular
.module('app.shell')
.controller('Bottom', Bottom);

function Bottom() {
  let vm = this;
  vm.message = 'Bottom';
}

}());