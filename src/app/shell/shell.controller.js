(function(){

'use strict';

angular
.module('app.shell')
.controller('Shell', Shell);

function Shell() {
  let vm = this;
  vm.message = 'Hello World Test';
}

}());