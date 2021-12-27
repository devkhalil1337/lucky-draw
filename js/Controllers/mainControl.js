var app = angular.module('luckDrawApp');
app.controller("MainControl",['$scope','navigationService', function ($scope,navigationService) {
	"ngInject";
	function init() {

		console.log("main controller")
		$scope.selectedTab = "settings";
		navigationService.setActiveTemplate($scope.selectedTab);
	}

	$scope.changeTab = function(selectedTab){
		navigationService.setActiveTemplate(selectedTab);
	}


	$('#startBtn').on('click', function(){
		$("#startMenu").toggleClass("showMenu");
	});

	$scope.$on("$destroy", navigationService.observeActiveTemplateChanged(
		function (val) {
			var activeOptionObj = navigationService.getActiveTemplate();
			$scope.activeOption = activeOptionObj.url;
			$scope.headerText = activeOptionObj.topHeader;
		}
	));
	init();
}]);