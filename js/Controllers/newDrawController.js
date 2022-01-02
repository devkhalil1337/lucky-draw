angular.module('luckDrawApp').controller("newDrawController", ['$scope', 'navigationService','localStorageService', function($scope, navigationService,localStorageService) {
	
	$scope.imagesObj ={
		imagesList:[],
		selectedImage:'',
		PreviewImage:'',
		index:0
	};

	function init() {
		console.log("newDrawController execyted");
		$scope.imagesObj.imagesList = localStorageService.getImagesList();
	}

	
	
	
	
	
	
	
	
	$scope.SelectFile = function (e) {
		let reader = new FileReader();
		reader.onload = function (e) {
			$scope.imagesObj.PreviewImage = e.target.result;
			$scope.$apply();
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	$scope.clear = function () {
		angular.element("input[type='file']").val(null);
		$scope.imagesObj.PreviewImage = '';
	};
	
	$scope.getImageIndex = (img) => {
		let imagesList = localStorageService.getImagesList();
		let index = imagesList.indexOf($scope.imagesObj.selectedImage);
		$scope.imagesObj.index = index;
	}
	
	
	$scope.saveImage = async () => {
		try{
			let isImageSaved = await localStorageService.setImage($scope.imagesObj.PreviewImage);
			if(isImageSaved){
				$scope.imagesObj.imagesList = localStorageService.getImagesList();
				$scope.imagesObj.PreviewImage = '';
			}
		}catch(error){
			console.log("unable to store image",error);
		}
	}
	
	init();
	
}]);