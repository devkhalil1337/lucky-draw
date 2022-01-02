document.addEventListener("DOMContentLoaded", function onDeviceReady() {

	console.log("device ready event triggered....");
	angular.bootstrap(document, ['luckDrawApp']);

	console.log("device ready event completed....");
}, false);


angular.module('luckDrawApp', ['ngRoute', 'ngLocale'])
	.config(['$routeProvider', '$httpProvider', '$localeProvider', '$compileProvider',function ($routeProvider, $httpProvider, $localeProvider, $compileProvider) {
		"ngInject";
		// $compileProvider.imgSrcSanitizationWhitelist('chrome-extension://');
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|file):/);
		$localeProvider.id = 'en';
		$routeProvider
			.when('/', {
				templateUrl: 'html/main-page.html', controller: 'MainControl'
			})
			.otherwise({ redirectTo: "/" });

		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$httpProvider.defaults.headers.post["Accept"] = "*/*";
		$httpProvider.defaults.useXDomain = true;
	}])
	.factory("detachedScope", ['$rootScope', function ($rootScope) {
		"ngInject";
		return {
			$new: function () {
				var internalScope = $rootScope.$new(true, {});
				var oldOn = internalScope.$on;
				internalScope.$on = function (name, fn) {
					return oldOn.call(internalScope, name, function (e, val) {
						fn(e, val);
						// stop event from leaking to $rootScope
						e.stopPropagation();
					});
				};
				return internalScope;
			}
		}
	}]);
