angular.module('luckDrawApp').factory('authService',['$injector','localStorageService', function ($injector,localStorageService) {
    "ngInject";

    let factory = {};

    factory.isFirstTimeLoad = () => {
        let isFirstTime = localStorageService.isFirstTimeLoaded();
        let username = localStorageService.getUserName();
        let computerName = nw.process.env.COMPUTERNAME;
        if(!username && !isFirstTime){
            return true;
        }
        if(username != computerName){
            localStorageService.setUserName(null);
            return true;
        }
        return false;
    }

    factory.isKeyvalid = (key) => {
        let keys = ['sn6qcspu2K2XBhq7WO6N5HCzCKTuKEqq','h6FA3rIvRK3aO8SLwHrWl6M4AXxTlfBI','hFlgnO70QRER3KuPw9c6Di71NuiePFal','OZy9J3jQ8H9dKaakOKmXmlxzYi835AFy','123456789']
        if(keys.includes(key)){
            let computerName = nw.process.env.COMPUTERNAME;
            localStorageService.setFirstTimeLoaded(true);
            localStorageService.setUserName(computerName);
            return true;
        }
        return false;
    }
   
    return factory;
}]);