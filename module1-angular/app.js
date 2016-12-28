(function functionName() {
  'use strict';
  console.log("hello");
  angular.module('Calculator',[])
  .controller('CalcController',CalcController);


  CalcController.$inject = ['$scope'];

  function CalcController($scope){
      $scope.input ="";
      $scope.output="";



      $scope.calculate = function(){
        var numberofwords = $scope.input.split(",").length;

        if(numberofwords==1&&$scope.input.split(",")[0]==""){
          $scope.output="Please enter data first";
        }else if (numberofwords<=3){
          $scope.output="Enjoy!";

        }else{
          $scope.output="Too much!";
        }
      }
  };

})()
