angular.module('luckDrawApp').controller("newDrawController", ['$scope', 'navigationService','localStorageService','commanService','notificationService','$interval','$q', function($scope, navigationService,localStorageService,commanService,notificationService,$interval,$q) {

	$scope.customersObj = {
		list:[],
		product:{},
		limit:0
	}

	$scope.prizeObj = {
		list:[]
	}

	$scope.winners = {
		list:[]
	}

	function init() {
		console.log("newDrawController execyted");
	}

	var timer
	
	$scope.onNewDraw = async () => {
		$scope.prizeObj.list = localStorageService.getPrizeList();
		$scope.customersObj.list = localStorageService.getPrizeCandidates();
		if(!$scope.prizeObj.list || $scope.prizeObj.list.length == 0 || !$scope.customersObj.list || $scope.customersObj.list.length == 0){
			notificationService.showNotification("Prize or Customer list is not found.", "fa fa-check", 3);
			return;
		}
		$("#main_one").modal("show");
		let prizeLength = $scope.prizeObj.list.length;
		for(let i = 0; i < prizeLength; i++){
			if($scope.prizeObj.list[i].alreadydrawn >= $scope.prizeObj.list[i].prizequantity)
				continue;
			$scope.prizeObj.list[i].columns = Math.ceil(12/$scope.prizeObj.list[i].noofwinners);
			$scope.customersObj.product = $scope.prizeObj.list[i];
			// if()
			// $scope.customersObj.limit = 
			let response = await $scope.customersList();
			$scope.winners.list.push(commanService.getArrayRandomWinners(response,$scope.customersObj.product));
			// console.log(response);
		}		
		$("#main_one").modal("hide");
		$(".modal-backdrop").remove()
		$("#new_winner_list").modal("show");
		// $scope.changeTab('winnerList','winner_list');
	}

	$scope.customersList = () => {		
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				timer = $interval(() => {
					$scope.customersObj.list = commanService.randomizeArr($scope.customersObj.list);
					// $scope.$apply();
				},50);
				setTimeout(() => {
					$interval.cancel(timer);
					resolve($scope.customersObj.list)
				},5000)

			},500)
		})

	}

	$scope.getCustomers = (array) => {
		return array
	}
	
	

		$scope.$on("$destroy", navigationService.observeActiveTemplateChanged(
			function (val) {
				$interval.cancel(timer);
			}
		));
	
	init();



	
}]);