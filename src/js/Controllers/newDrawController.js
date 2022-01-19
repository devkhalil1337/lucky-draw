angular.module('luckDrawApp').controller("newDrawController", ['$scope', 'navigationService','localStorageService','commanService','notificationService','$interval','$q', function($scope, navigationService,localStorageService,commanService,notificationService,$interval,$q) {

	$scope.customersObj = {
		list:[],
		product:{}
	}

	$scope.prizeObj = {
		list:[]
	}

	function init() {
		console.log("newDrawController execyted");
	}

	
	
	$scope.onNewDraw = async () => {
		$scope.prizeObj.list = localStorageService.getPrizeList();
		$scope.customersObj.list = localStorageService.getPrizeCandidates();
		$("#main_one").modal("show");
		for(let i =0; i < $scope.prizeObj.list.length; i++){
			$scope.prizeObj.list[i].columns = Math.ceil(12/$scope.prizeObj.list[i].noofwinners);
			$scope.customersObj.product = $scope.prizeObj.list[i];
			let response = await $scope.customersList();
			console.log(response);
		}		
	}

	$scope.customersList = () => {		
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				const timer = $interval(() => {
					$scope.customersObj.list = random($scope.customersObj.list);
					// $scope.$apply();
				},50);
				setTimeout(() => {
					$interval.cancel(timer);
					resolve(true)
				},5000)

			},500)
		})

	}

	$scope.getCustomers = (array) => {
		return array
	}
	
	let random = function (array) {
		let currentIndex = array.length,  randomIndex;
		// While there remain elements to shuffle...
		while (currentIndex != 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}

		return array;
		}
	
	init();



	
}]);