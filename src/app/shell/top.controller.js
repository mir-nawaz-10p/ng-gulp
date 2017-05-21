(function(){

'use strict';

angular
.module('app.shell')
.controller('Top', Top);

function Top() {
  var vm = this;
  vm.message = 'Top';
}

}());