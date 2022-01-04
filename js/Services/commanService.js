angular.module('luckDrawApp').factory('commanService',['$injector', function ($injector) {
    "ngInject";

    let factory = {}
 

    factory.emptyObect = (object) => {
        Object.keys(object).forEach((key) => {
            object[key] = null;
        })
        return object;
    }

    return factory;
   
}]);