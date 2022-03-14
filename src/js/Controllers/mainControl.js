var app = angular.module('luckDrawApp');
app.controller("MainControl",['$scope','navigationService','localStorageService','authService', 'notificationService',function ($scope,navigationService,localStorageService,authService,notificationService) {
	"ngInject";

	$scope.settingsObj = {
		backgroundImage:'',
		index:0
	}

	$scope.loginCredentials = {
		key:''
	}


	function init() {
		if(authService.isFirstTimeLoad()){
			$('#login_modal').modal('show');
			return;
		}
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

	$scope.onLogin = () => {
		if(authService.isKeyvalid($scope.loginCredentials.key)){
			notificationService.showNotification("User logged in successfully", "fa fa-check", 2);
			$('#login_modal').modal('toggle');
		}else
			notificationService.showNotification("Invalid or incorrent key", "fa fa-check", 3);
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