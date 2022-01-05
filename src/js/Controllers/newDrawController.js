angular.module('luckDrawApp').controller("newDrawController", ['$scope', 'navigationService','localStorageService','commanService', function($scope, navigationService,localStorageService,commanService) {
	$scope.prizeList = {list:[]}
	$scope.imagesObj ={
		imagesList:[],
		selectedImage:'',
		PreviewImage:'',
		index:0
	};

	$scope.addNewPrize = {
		drawName:'',
		prizeQuantity:0,
		selectedImage:'',
		PreviewImage:'',
		imagesList:[]
	}

	function init() {
		console.log("newDrawController execyted");
		$scope.imagesObj.imagesList = localStorageService.getImagesList();
	}

	
	
	
	
	$scope.gridOptions = {
		defaultColDef: {
			resizable: true,
		},
		columnDefs: [{
			headerName: "Prize Image",
			field: "prizeimage",
			width:150,
			cellRenderer: params => '<img src=' + params.value + '>'
		}, {
			headerName: "Draw Name",
			field: "drawname",
			width:150,
		}, {
			headerName: "Prize Quantity",
			field: "prizequantity",
			width:150,
		}, {
			headerName: "Already Drawn",
			field: "alreadydrawn",
			width:150,
			cellRenderer: params => params.value ? 'Yes' : 'No'
		}, {
			headerName: "x-no of Winners",
			field: "noofwinners",
			width:150,
		}, {
			headerName: "Prize Name",
			field: "prizename",
			width:150,
		}, ],
		rowData:localStorageService.getPrizeList(),
		// [
		// 	{drawname: "Mark", prizequantity: "10", alreadydrawn: '2', noofwinners: '1', prizename: 'PS4',prizeimage:''},
		// 	{drawname: "Frank", prizequantity: "10", alreadydrawn: '10', noofwinners: '8', prizename: 'Laptop',prizeimage:''},
		// 	{drawname: "Mark", prizequantity: "10", alreadydrawn: '36', noofwinners: '25', prizename: 'Cup',prizeimage:''},
		// 	{drawname: "Mark", prizequantity: "10", alreadydrawn: '0', noofwinners: '0', prizename: 'Glass',prizeimage:''},
		// ],
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


	   $scope.OnAddNewPrize = async () => {
		try{
			let params = { 
			 drawname:$scope.addNewPrize.drawName,
			 prizequantity:$scope.addNewPrize.prizeQuantity,
			 alreadydrawn:false,
			 noofwinners:0,
			 noofwinners:0,
			 prizename:'',
			 prizeimage:$scope.addNewPrize.selectedImage
			}
			let response = await localStorageService.setPrizeObj(params);
			if(response){
				alert("Prize added");
				let rowData = [];
				$scope.gridOptions.api.forEachNode(node => rowData.push(node.data));
				$scope.gridOptions.api.setRowData([...rowData,params])
			}
		}catch(error){
			console.log(error);
		}
	   }
	   

	   $scope.clearObject = () => {
		$scope.addNewPrize = {}
	   }
	   

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
	
	$scope.SelectFile = function (event,number) {
		let reader = new FileReader();
		reader.onload = function (e) {
			$scope.imagesObj.PreviewImage = e.target.result;
			$scope.imagesObj.selectedImage = event.target.files[0];
			$scope.addNewPrize.selectedImage = e.target.result;
			$scope.$apply();
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	$scope.clear = function () {
		angular.element("input[type='file']").val(null);
		$scope.imagesObj.PreviewImage = '';
	};
	
	$scope.getImageIndex = () => {
		let imagesList = localStorageService.getImagesList();
		let index = imagesList.indexOf($scope.imagesObj.selectedImage);
		$scope.imagesObj.index = index;
	}
	
	
	$scope.saveImage = async () => {
		debugger
		try{
			let {name,path} = $scope.imagesObj.selectedImage;
			name = name.split(" ").join("_");
			if(commanService.uploadFile(name,path)){
				alert("Image uploaded");
				let isImageSaved = await localStorageService.setImage(name);
				if(isImageSaved){
					debugger
					$scope.imagesObj.imagesList = localStorageService.getImagesList();
					$scope.imagesObj.PreviewImage = '';
					$scope.imagesObj.selectedImage = name
					$scope.getImageIndex();
				}
			}

		}catch(error){
			console.log(error);
		}
	}

	$scope.deleteFile = () => {
		if(commanService.deleteFile($scope.imagesObj.selectedImage)){
			localStorageService.removeImage($scope.imagesObj.selectedImage);
			$scope.imagesObj.imagesList = localStorageService.getImagesList();
			$scope.imagesObj.PreviewImage = "";
			$scope.imagesObj.selectedImage = "";
			alert("File deleted");
		}
	}

	//End of Interface
	
	init();
	
}]);