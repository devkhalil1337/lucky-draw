var app = angular.module('luckDrawApp');
app.controller("MainControl",['$scope','navigationService', function ($scope,navigationService) {
	"ngInject";
	function init() {

		console.log("main controller")
		$scope.selectedTab = "addPrize";
		navigationService.setActiveTemplate($scope.selectedTab);
	}

	$scope.changeTab = function(selectedTab,modalId){
		navigationService.setActiveTemplate(selectedTab);
		setTimeout(()=>{
			$('#'+modalId).modal('toggle');
		},500)
	}


	$('#startBtn').on('click', function(){
		$("#startMenu").toggleClass("showMenu");
	});

	$scope.$on("$destroy", navigationService.observeActiveTemplateChanged(
		function (val) {
			console.log(val);
			let activeOptionObj = navigationService.getActiveTemplate();
			$scope.activeOption = activeOptionObj.url;
			$scope.headerText = activeOptionObj.topHeader;
		}
	));
	init();
}]);