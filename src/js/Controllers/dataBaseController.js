angular.module('luckDrawApp').controller("dataBaseController", ['$scope', 'navigationService','localStorageService','notificationService', function($scope, navigationService,localStorageService,notificationService) {
	function init() {
		console.log("dataBaseController execyted");
		console.log(localStorageService.getPrizeCandidates());
	}

	$scope.gridOptions = {
		defaultColDef: {
			resizable: true,
		},
		columnDefs: [
			{ 
			field: 'RowSelect',
			headerName: ' ',
			headerCheckboxSelection: true,
			checkboxSelection: true,
			width:100
			},{
			headerName: "Candidates",
			field: "candidates",
			width:150,
			valueGetter: params => params.data.candidates
		}],
		enableSorting: true,
		enableColResize: true,
		rowSelection: 'multi',
		rowData:localStorageService.getPrizeCandidates(),
		onRowSelected: params => {
		},
		onGridReady: function(params) {
			// params.api.sizeColumnsToFit();

		},
	};

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

	  $scope.saveList = () => {
		  let candidatesList = $scope.sheet;
		  if(!candidatesList){
			notificationService.showNotification("unable to save", "fa fa-check", 3);
			  return;
		  }

		  if(localStorageService.setPrizeCandidates(candidatesList)){
			notificationService.showNotification("Customers list has been updated", "fa fa-check", 2);
		  }
	  }


	init();
}]);