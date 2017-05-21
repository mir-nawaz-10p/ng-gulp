(function(){

'use strict';

angular
.module('app.home')
.controller('Home', Home);

function Home() {
  var vm = this;
  vm.message = 'Hello World Home';
}

}());