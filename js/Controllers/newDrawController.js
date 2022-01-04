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

	
	
	
	
	$scope.gridOptions = {
		defaultColDef: {
			resizable: true,
		},
		columnDefs: [
			{headerName: "Draw Name", field: "drawname"},
			{headerName: "Prize Quantity", field: "prizequantity"},
			{headerName: "Already Drawn", field: "alreadydrawn"},
			{headerName: "x-no of Winners", field: "noofwinners"},
			{headerName: "Prize Name", field: "prizename"},
			{headerName: "Prize Image", field: "prizeimage"},
		],
		rowData: [
			{drawname: "Mark", prizequantity: "10", alreadydrawn: '2', noofwinners: '1', prizename: 'PS4',prizeimage:''},
			{drawname: "Frank", prizequantity: "10", alreadydrawn: '10', noofwinners: '8', prizename: 'Laptop',prizeimage:''},
			{drawname: "Mark", prizequantity: "10", alreadydrawn: '36', noofwinners: '25', prizename: 'Cup',prizeimage:''},
			{drawname: "Mark", prizequantity: "10", alreadydrawn: '0', noofwinners: '0', prizename: 'Glass',prizeimage:''},
		],
		enableSorting: true,
		enableColResize: true,
		onGridReady: function(params) {
			params.api.sizeColumnsToFit();
		},
	};

	$(".nav-item").on("click", function (e) {
		setTimeout(() => {
			if(e.target.id.indexOf('pills-profile-tab') > -1 && e.target.className.indexOf('active') > -1){
				$scope.gridOptions.api.sizeColumnsToFit()
			}			
		}, 50);
       });


	   $scope.loadWorksheet = function(e) {
		// Read Workbook
		let file = e.target.result;
		let workbook = XLSX.read(file, { type: "binary" });
	
		// Get the first worksheet as JSON
		let sheetName = workbook.SheetNames[0];
		
		// Update scope and log it
		$scope.sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);    
		console.log($scope.sheet);


		$scope.gridOptions.api.setRowData($scope.sheet);
		// $scope.$apply(); // Need this to update angular of the changes
	  };

	
	//Interface
	
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

	//End of Interface
	
	init();
	
}]);