(function(){
	'use strict';
	angular.module('NarrowItDownApp',[])
	.service('MenuSearchService',MenuService)
	.controller('NarrowItDownController',narrowFunc)
	.directive('foundItems',foundItems);


	function foundItems(){
		var ddo={
			templateUrl: 'display.html',
			scope:{
				items:"<",
				onRemove:"&",
				empty:"@"
			},
			controller:itemFinder,
			controllerAs:'itemFinder',
			bindToController:true
		};

		return ddo;
	}

	function itemFinder(){
		
	}

	MenuService.$inject=['$http'];
	function MenuService($http){
		var service = this;
		service.getMatchedMenuItems=function(searchTerm){
			
			service.response = $http({
				method:"GET",
				url:('https://davids-restaurant.herokuapp.com/menu_items.json')
			});	

			return service.response;	

			
		}

		

	}

	narrowFunc.$inject = ['$scope','MenuSearchService'];
	function narrowFunc($scope,MenuSearchService){
		var narrower = this;

		$scope.input = "";
		narrower.empty = "";
		narrower.term = $scope.input;
		narrower.promise={};
		narrower.found=[];
		narrower.find = function(searchTerm){
			narrower.found=[];
			narrower.promise = MenuSearchService.getMatchedMenuItems(searchTerm);
			narrower.promise.then(function (response){
				for(var i=0;i<response.data.menu_items.length;i++){
					
					
					if(response.data.menu_items[i].description.indexOf(searchTerm)!==-1){
						narrower.found.push(response.data.menu_items[i]);
						
					}
				}
				narrower.empty = "";	
				
				if (!/\S/.test(searchTerm)||narrower.found.length==0) {
    				narrower.found=[];
    				narrower.empty = "Nothing found";
					
				}

			})

			.catch(function(error){
				console.log(error);
			});	


		
		}

		narrower.onRemove = function(index){
			narrower.found.splice(index,1);
			
		}

		

		


	}

})();