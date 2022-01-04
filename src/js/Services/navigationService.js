angular.module('luckDrawApp').factory('navigationService',['detachedScope', function (detachedScope) {
	"ngInject";
	var activeTemplateName = "settings";
	var internalScope = detachedScope.$new();

	var allTemplates = [];
	allTemplates["addPrize"] = {url: "html/add-prizes.html", topHeader: "Add Prize"};
	allTemplates["newDraw"] = {url: "html/new-draw.html", topHeader: "New Draw"};
	allTemplates["winnerList"] = {url: "html/display-winner-list.html", topHeader: "Display Winners List"};
	allTemplates["systemSettings"] = {url: "html/system-settings.html", topHeader: "System Settings"};
	allTemplates["database"] = {url: "html/dataBase.html", topHeader: "DataBase"};

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