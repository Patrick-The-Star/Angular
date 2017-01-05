(function(){
	'use strict';
	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController',ToBuyController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);
   	

	function ShoppingListCheckOffService(){
		var shopService = this;
		shopService.toBuyItems =[{name:"cookies",quantity:10},{name:"cookies",quantity:10},{name:"pizza",quantity:3},{name:"noodles",quantity:30},{name:"milk",quantity:20}];
		shopService.boughtItems = [];

		shopService.getBoughtItems = function(){
			return shopService.boughtItems;
		}

		shopService.getToBuyItems = function(){
			return shopService.toBuyItems;
		}

		shopService.transfer=function(index){
			var elem = shopService.toBuyItems.splice(index,1);
			console.log(elem);
			shopService.boughtItems.push.apply(shopService.boughtItems,elem);
		}
	}


	ToBuyController.$inject=['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var toBuy = this;
		toBuy.items = ShoppingListCheckOffService.getToBuyItems();

		toBuy.transfer = function(index){
			ShoppingListCheckOffService.transfer(index);
		}
	}

   	AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
   	function AlreadyBoughtController(ShoppingListCheckOffService){
   		var bought=this;
   		bought.items = ShoppingListCheckOffService.getBoughtItems();
   		console.log("hello");
   	}


})();