angular.module('luckDrawApp').controller("systenSettingsController", ['$scope', 'navigationService','localStorageService','commanService','notificationService', function($scope, navigationService,localStorageService,commanService,notificationService) {
	$scope.prizeList = {list:[]}
	$scope.imagesObj ={
		imagesList:[],
		selectedImage:'',
		PreviewImage:'',
		index:0
	};

	$scope.addNewPrize = {
		drawName:'',
		noofwinners:'',
		alreadydrawn:0,
		prizeQuantity:0,
		selectedImage:'',
		PreviewImage:'',
		imagesList:[]
	}

	$scope.drawDisplayObjects = {
		rollSpeed:1,
		fontFamily:'',
		fontSize:'',
		fontColor:'',
		tintArea:0
	}

	$scope.modalObj = {
		onDeletePrize: () => {
			if($scope.addNewPrize.id)
		   	$('#delete_prize').modal('show');
		},
		onEditPrize: () => {
			if($scope.addNewPrize.id)
			$('#add_new_prize').modal('show');
		}

	}

	function init() {
		console.log("systenSettingsController execyted");
		$scope.imagesObj.imagesList = localStorageService.getImagesList();
		$scope.drawDisplayObjects = localStorageService.getDrawSettings()
	}

	
	
	
	
	$scope.gridOptions = {
		defaultColDef: {
			resizable: true,
		},
		columnDefs: [{
			 field: 'RowSelect',
			headerName: ' ',
			headerCheckboxSelection: true,
			checkboxSelection: true,
			sort: false,
			width: 100
		}, {
			headerName: "Prize Name",
			field: "drawname",
			width: 200,
			cellClass: () => 'text-center'
		}, {
			headerName: "Image",
			field: "prizeimage",
			width: 100,
			cellRenderer: params => '<img src=images/' + params.value + '>',
			cellClass: () => 'text-center'
		}, {
			headerName: "Prize Quantity",
			field: "prizequantity",
			width: 150,
			cellClass: () => 'text-center'
		}, {
			headerName: "x-no of Draws",
			field: "alreadydrawn",
			width: 150,
			cellRenderer: params => params.value,
			cellClass: () => 'text-center'
		}, {
			headerName: "x-no of Winners",
			field: "noofwinners",
			width: 150,
			cellClass: () => 'text-center'
		}],
		rowData:localStorageService.getPrizeList(),
		enableSorting: true,
		enableColResize: true,
		rowSelection: 'multiple',
		onRowSelected: params => {
			const rowData = params.api.getSelectedRows() && params.api.getSelectedRows()[0];
			let id = $scope.gridOptions.api.getSelectedNodes() && $scope.gridOptions.api.getSelectedNodes()[0] && $scope.gridOptions.api.getSelectedNodes()[0].id
			if(!rowData || !id || rowData.length == 0) return;
			$scope.addNewPrize = {
				id: id,
				isUpdate: true,
				drawName: rowData.drawname,
				noofwinners: rowData.noofwinners,
				prizeQuantity: rowData.prizequantity,
				selectedImage: rowData.prizeimage,
				PreviewImage: '',
				imagesList: localStorageService.getPrizeList()
			}
			$scope.addNewPrize.selectedImage = localStorageService.getPrizeList()[id].prizeimage
			$scope.$apply();
		},
		onGridReady: function(params) {
			params.api.sizeColumnsToFit();
			if(!$scope.gridOptions.api.getRowNode(0))
				$scope.gridOptions.api.showNoRowsOverlay();
		},
	};




	   $scope.OnAddNewPrize = async () => {
		try{
			let {name,path} = commanService.extractNamePath($scope.addNewPrize.selectedImage)
			let params = { 
			 drawname:$scope.addNewPrize.drawName,
			 noofwinners:$scope.addNewPrize.noofwinners,
			 prizequantity:$scope.addNewPrize.prizeQuantity,
			 alreadydrawn:0,
			 prizeimage:name
			}
			let id = $scope.addNewPrize.id;
			let response = {}
			if(!!id){
				response = await localStorageService.setPrizeObj(params,id);
				if(path)
					commanService.uploadFile(name,path);
				let rowdata = $scope.gridOptions.api.getRowNode(id);
				rowdata.setDataValue('drawname', params.drawname);
				rowdata.setDataValue('noofwinners', params.noofwinners);
				rowdata.setDataValue('prizequantity', params.prizequantity);
				rowdata.setDataValue('prizeimage', params.prizeimage);
				rowdata.setDataValue('noofwinners', params.noofwinners);
				notificationService.showNotification("Prize updated successfully.", "fa fa-check", 2);
				$("#add_new_prize").modal("hide");
				return;
			}
			else 
				response = await localStorageService.setPrizeObj(params);
			if(response && commanService.uploadFile(name,path)){
				notificationService.showNotification("Prize Added", "fa fa-check", 2);
				let rowData = [];
				$scope.gridOptions.api.forEachNode(node => rowData.push(node.data));
				$scope.gridOptions.api.setRowData([...rowData,params]);
				$("#add_new_prize").modal("hide");
			}
		}catch(error){
			console.log(error);
			notificationService.showNotification(error, "fa fa-check", 4);
		}
	   }

	   $scope.onOpenNewAddPrizePopUp = () => {
		$scope.clear();
		$scope.addNewPrize = {
			drawName:'',
			noofwinners:'',
			prizeQuantity:0,
			selectedImage:'',
			PreviewImage:'',
			imagesList:[]
		}
		$scope.addNewPrize.imagesList =  localStorageService.getPrizeList();
		//  $scope.addNewPrize.selectedImage = $scope.addNewPrize.imagesList[1].prizeimage;
	   }

	   $scope.onDeletePrize = () => {
		let node = $scope.gridOptions.api.getSelectedNodes();
		if(!node)
			return
		if(node.length > 1){
			$scope.gridOptions.api.removeItems(node);
			node.forEach((element,index) => {
				localStorageService.deletePrize(element.id);
			});
			$('#delete_prize').modal('hide');
			notificationService.showNotification("Entries deleted successfully!", "fa fa-check", 2);
			return;
		}
		 let id = node && node[0] && node[0].id;
		 $scope.gridOptions.api.removeItems(node);
		 if(localStorageService.deletePrize(id)){
			$('#delete_prize').modal('hide');
			notificationService.showNotification("Entry deleted successfully!", "fa fa-check", 2);
		 }

	   }

	   $scope.onDeleteAllPrize = () => {
		let node = $scope.gridOptions.api.getRowNode(0);
		if(!node)
			return
		 let id = node && node[0] && node[0].id;
		 if(localStorageService.deleteAllPrize(id)){
			 $scope.gridOptions.api.setRowData([]);
			 $('#delete_all_prize').modal('hide');
			notificationService.showNotification("All enteries has been deleted successfully!", "fa fa-check", 2);
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
	
	$scope.SelectFile = function (event,name) {
		let reader = new FileReader();
		reader.onload = function (e) {
			if(name == 'prize'){
				$scope.addNewPrize.PreviewImage = e.target.result;
				$scope.addNewPrize.selectedImage = event.target.files[0];
			}else{
				$scope.imagesObj.PreviewImage = e.target.result;
				$scope.imagesObj.selectedImage = event.target.files[0];
			}
			
			$scope.$apply();
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	$scope.clear = function () {
		angular.element("input[type='file']").val(null);
		$scope.imagesObj.PreviewImage = '';
		$scope.imagesObj.selectedImage = '';
		$scope.addNewPrize.selectedImage = '';
	};
	
	$scope.getImageIndex = () => {
		let imagesList = localStorageService.getImagesList();
		let index = imagesList.indexOf($scope.imagesObj.selectedImage);
		$scope.imagesObj.index = index;
	}
	
	
	$scope.saveImage = async () => {
		debugger
		try{
			let {name,path} = commanService.extractNamePath($scope.imagesObj.selectedImage)
			if(commanService.uploadFile(name,path)){
				notificationService.showNotification(name + " uploaded successfully", "fa fa-check", 2);
				let isImageSaved = await localStorageService.setImage(name);
				if(isImageSaved){
					$scope.imagesObj.imagesList = localStorageService.getImagesList();
					$scope.imagesObj.PreviewImage = "";
					let index = $scope.imagesObj.imagesList.indexOf(name);
					$scope.imagesObj.selectedImage = $scope.imagesObj.imagesList[index];
					$scope.clear();
					$scope.getImageIndex();
					$scope.$apply();
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
			notificationService.showNotification("File deleted successfully", "fa fa-check", 2);
		}
	}

	//End of Interface
	

	$scope.OnSaveDrawSetting = () => {
		try {
			let drawSetting = {...$scope.drawDisplayObjects
			};
			localStorageService.setDrawSettings(JSON.stringify(drawSetting));
			notificationService.showNotification("Draw setting has been saved successfully", "fa fa-check", 2);
		} catch(error) {
			console.log(error);
			notificationService.showNotification(error, "fa fa-check", 4);
		}
	}
	$scope.OnResetDrawSetting= () => {
		try {
			$scope.drawDisplayObjects
			let drawSetting = {
				rollSpeed:1,
				fontFamily:'',
				fontSize:'',
				fontColor:'',
				tintArea:0
			};
			$scope.drawDisplayObjects = drawSetting;
			localStorageService.setDrawSettings(JSON.stringify(drawSetting));
			notificationService.showNotification("Draw setting has been resetted successfully", "fa fa-check", 2);
		} catch(error) {
			console.log(error);
			notificationService.showNotification(error, "fa fa-check", 4);
		}
	}



	init();


	
}]);