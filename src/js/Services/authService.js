angular.module('luckDrawApp').factory('authService',['$injector','localStorageService', function ($injector,localStorageService) {
    "ngInject";

    let factory = {};

    factory.isFirstTimeLoad = () => {
        let isFirstTime = localStorageService.isFirstTimeLoaded();
        let username = localStorageService.getUserName();
        let computerName = nw.process.env.COMPUTERNAME;
        if(!username && !isFirstTime){
            let encryptionKey = CryptoJS.AES.encrypt(computerName, "iamroot");
            localStorageService.setEncryptionKey(encryptionKey)
            return true;
        }
        if(username != computerName){
            localStorageService.setUserName(null);
            return true;
        }
        return false;
    }

    factory.isKeyvalid = (key) => {
        let computerName = nw.process.env.COMPUTERNAME;
        let decryptedKey = CryptoJS.AES.decrypt(key, "iamroot");
        plainText = decryptedKey.toString(CryptoJS.enc.Utf8);
        if(plainText.toLowerCase() == computerName.toLowerCase()){
            localStorageService.setFirstTimeLoaded(true);
            localStorageService.setUserName(computerName);
            return true;
        }
        return false;
    }
   
    return factory;
}]);