angular.module('luckDrawApp').factory('commanService',['$injector', function ($injector) {
    "ngInject";

    let factory = {}
    var fs = require('fs');

    factory.emptyObect = (object) => {
        Object.keys(object).forEach((key) => {
            object[key] = null;
        })
        return object;
    }

    factory.uploadFile = async (fileName,filePath) => {
        console.log(fileName,filePath);
        try{
        let response = fs.copyFileSync(filePath, "images/"+fileName);
            if (response) throw response;
        console.log(`${fileName} was copied to images/${fileName}`);
        }catch(error){
            console.log(error);
            return false;
        }
    }


    factory.deleteFile = async (fileName) => {
        try{
            let response = fs.unlinkSync("images/"+fileName);
                if (response) throw response;
            console.log(`${fileName} is deleted`);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    return factory;
   
}]);