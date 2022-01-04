var app = angular.module('luckDrawApp');
app.controller("MainControl",['$scope','navigationService','localStorageService', function ($scope,navigationService,localStorageService) {
	"ngInject";

	$scope.settingsObj = {
		backgroundImage:'',
		index:0
	}


	function init() {

		console.log("main controller")
		$scope.selectedTab = "addPrize";
		navigationService.setActiveTemplate($scope.selectedTab);
		let defaultIndex = localStorageService.getDefaultImageIndex();
		let listOfImages = localStorageService.getImagesList();
		$scope.settingsObj.backgroundImage = listOfImages[defaultIndex];
		localStorageService.setDefaultImageIndex(defaultIndex); //storing default index for images
	}

	$scope.changeTab = function(selectedTab,modalId){
		navigationService.setActiveTemplate(selectedTab);
		setTimeout(()=>{
			$('#'+modalId).modal('toggle');
		},100)
	}



	$('#fullBtn').on('click', function(){
		let ngui = require('nw.gui');
		let nwin = ngui.Window.get();
		if(nwin.isFullscreen)
			nw.Window.get().leaveFullscreen();
		else
			nwin.enterFullscreen();
	});
	$('#startBtn').on('click', function(){
		$("#startMenu").toggleClass("showMenu");
	});

	$scope.ApplyImage = (index) => {
		let listOfImages = localStorageService.getImagesList();
		$scope.settingsObj.backgroundImage = listOfImages[index];
		localStorageService.setDefaultImageIndex(index); //storing default index for images
	}

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