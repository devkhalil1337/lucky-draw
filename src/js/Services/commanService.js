angular.module('luckDrawApp').factory('commanService',['$injector','localStorageService', function ($injector,localStorageService) {
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

    factory.extractNamePath = (imageFile) => {
        let {name,path} = imageFile;
        if(!name && !path)
            return {
                name:imageFile
            }
			name = name.split(" ").join("_");
            return {
                name:name,
                path:path
            }
    }

    factory.randomizeArr = function(array) {
        let currentIndex = array.length,
            randomIndex;
        while(currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }

    factory.getArrayRandomWinners  = (customersArr,product) => {
        let winners = [];
        let winersList = localStorageService.getWinnersList();
        for(let i = 0; i < product.noofwinners;i++){
            winners.push(customersArr[Math.floor(Math.random() * customersArr.length)].candidates);
        }

        product.alreadydrawn++; //increasing number of draws
        localStorageService.setPrizeObj(product,product.id);
        if(!winersList)
            winersList = [];
        winersList[winersList.length] = {
            winnersList: winners,
            product:product
        }
        console.log("Winners",winners,winersList)
        localStorageService.setWinnersList(JSON.stringify(winersList));
      }


    return factory;
   
}]);