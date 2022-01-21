angular.module('luckDrawApp').controller("displayWinnerListController", ['$scope', 'navigationService','localStorageService', function($scope, navigationService,localStorageService) {
	
	$scope.winners = {
		list:[]
	}
	
	function init() {
		console.log("displayWinnerListController execyted");
		$scope.winners.list = localStorageService.getWinnersList();
	
	}
	
	init();
}]);