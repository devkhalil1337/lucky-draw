angular.module('luckDrawApp').factory('navigationService',['detachedScope', function (detachedScope) {
	"ngInject";
	var activeTemplateName = "settings";
	var internalScope = detachedScope.$new();

	var allTemplates = [];
	allTemplates["settings"] = {url: "html/add-prizes.html", topHeader: "Settings"};

	return {

		getActiveTemplate: function () {
			return allTemplates[activeTemplateName];
		},

		setActiveTemplate: function (newActiveTemplateName, data) {
			if (data) {
				allTemplates[newActiveTemplateName].data = data;
			}
			activeTemplateName = newActiveTemplateName;
			internalScope.$emit("activeTemplateChange")

		},

		observeActiveTemplateChanged: function (fn) {
			return internalScope.$on("activeTemplateChange", function (e, val) {
				fn(val);
			});
		},
	}
}]);