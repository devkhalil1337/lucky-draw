angular.module('luckDrawApp').factory('localStorageService',['$injector', function ($injector) {
    "ngInject";


    let _setImage = (img) => {
        return new Promise((resolve,reject) => {
            try{
                let imageList = _getImagesList();
                let imageIndex = imageList.length;
                imageList[imageIndex] = img;
                localStorage.setItem("backgroundImage",JSON.stringify(imageList))
                return resolve(true);
            }catch(error){
                reject(error);
            }
        })
    }

    let _removeImage = (img) => {
        let imageList = _getImagesList();
        let index = imageList.indexOf(img);
        imageList.splice(index,1);
        localStorage.setItem("backgroundImage",JSON.stringify(imageList));
    }

    let _getImagesList = () => {
        let imageList = localStorage.getItem("backgroundImage");
        if(!imageList)
            return [];
        return JSON.parse(imageList);
    }

    let _setPrizeObj = (prizeObj) => {
        return new Promise((resolve,reject) => {
            try{
                let prizeList = _getPrizeList();
                let imageIndex = prizeList.length;
                prizeList[imageIndex] = prizeObj;
                localStorage.setItem("PrizeImages",JSON.stringify(prizeList))
                return resolve(true);
            }catch(error){
                reject(error);
            }
        })
    }

    let _getPrizeList = () => {
        let prizeList = localStorage.getItem("PrizeImages");
        if(!prizeList)
            return [];
        return JSON.parse(prizeList);
    }



    let _setDefaultImageIndex = (index) => localStorage.setItem("defaultIndex",index);

    let _getDefaultImageIndex = () => localStorage.getItem("defaultIndex");
    
  

    return {
        setImage :_setImage,
        getImagesList:_getImagesList,
        removeImage:_removeImage,
        setDefaultImageIndex :_setDefaultImageIndex,
        getDefaultImageIndex:_getDefaultImageIndex,
        setPrizeObj:_setPrizeObj,
        getPrizeList:_getPrizeList,
    }
}]);