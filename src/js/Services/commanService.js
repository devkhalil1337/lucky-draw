angular.module('luckDrawApp').factory('commanService',['$injector','localStorageService', function ($injector,localStorageService) {
    "ngInject";

    let factory = {}
    var fs = require('fs');
    var path = require('path')
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

    factory.currentDate = (form) => {
        let date = new Date();
       return  date.toLocaleDateString();
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
            product:product,
            date:factory.currentDate()
        }
        localStorageService.setWinnersList(JSON.stringify(winersList));
        return {
            winnersList: winners,
            product:product,
            date:factory.currentDate()
        }
      }

      factory.getInstalledAppPath = () => {
          let path = nw.App.startPath;
          if(path)
            return path.replace(/\\/g, "/") + "/"
          return "C:/";
      }

      factory.clearWinners = () => {
          return localStorageService.removeWinnersList();
      }

      factory.exportWinners = () => {
        let winnersList = localStorageService.getWinnersList();
        if(!winnersList) winnersList = [];
        let date = new Date();
        let fileName = `reports-${date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getHours()}`;
        let data = winnersList.map((elm, index) => {
            return {
                "Sr#": (index + 1),
                "Date": elm.date,
                "Product": elm.product.drawname,
                "Winners": elm.winnersList.join(",")
            }
        })
        let ws = XLSX.utils.json_to_sheet(data);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        // XLSX.writeFile(wb, fileName);

        let wbout = XLSX.write(wb, {type:"array", bookType:'xlsx'});
        let url = URL.createObjectURL(new Blob([wbout], {type: 'application/octet-stream'}));
        chrome.downloads.download({ url: url, filename: `${fileName}.xlsx`, saveAs: true });

        
        // let a = document.createElement("a");
        // let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
        // a.href = URL.createObjectURL(file);
        // a.download = fileName;
        // a.click();
    }


    return factory;
   
}]);