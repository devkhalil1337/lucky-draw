angular.module("luckDrawApp").directive("importSheetJs", function($parse) {
    return {
      link: function($scope, $elm, $attrs) {
        // Parse callback function from attribute
        var expressionHandler = $parse($attrs.onSheetLoad);
        
        // Pass upload event to callback    
        $elm.on("change", function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(e) {
            expressionHandler($scope, { e: e });
          };
          reader.readAsBinaryString(changeEvent.target.files[0]);
        });
      }
    };
  });