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

    let _setPrizeObj = (prizeObj,index) => {
        return new Promise((resolve,reject) => {
            try{
                let prizeList = _getPrizeList();
                let imageIndex = prizeList.length;
                if(index || index == 0)
                    prizeList[index] = prizeObj;
                else{
                    prizeObj.id = imageIndex;
                    prizeList[imageIndex] = prizeObj;
                }
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

    let _deletePrize = (index) => {
        return new Promise((resolve,reject) => {
            try{
                let imageList = _getPrizeList();
                imageList = imageList.filter((el,ind) =>  ind !=index);
                localStorage.setItem("PrizeImages",JSON.stringify(imageList))
                return resolve(true);
            }catch(error){
                reject(error);
            }
        })
    }

    let _deleteAllPrize = () => {
        return new Promise((resolve,reject) => {
            try{
                localStorage.setItem("PrizeImages",JSON.stringify([]))
                return resolve(true);
            }catch(error){
                reject(error);
            }
        })
    }

    let _setDefaultImageIndex = (index) => localStorage.setItem("defaultIndex",index);

    let _getDefaultImageIndex = () => localStorage.getItem("defaultIndex");
    

    let _setPrizeCandidates = (prizeObj,index) => {
        return new Promise((resolve,reject) => {
            try{
                let prizeList = _getPrizeCandidates();
                let imageIndex = prizeList.length;
                if(index)
                    prizeList[index] = prizeObj;
                prizeList = prizeObj
                localStorage.setItem("PrizeCandidates",JSON.stringify(prizeList))
                return resolve(true);
            }catch(error){
                reject(error);
            }
        })
    }
    let _getPrizeCandidates = () => {
        let prizeCandidates = localStorage.getItem("PrizeCandidates");
        if(!prizeCandidates)
            return [];
        return JSON.parse(prizeCandidates);
    }

    let _getWinnersList = () => {
        let winnersList = localStorage.getItem("WinnersList");
        if(!winnersList)
            return [];
        return JSON.parse(winnersList);
    }

    let _setWinnersList = (winnersList) => localStorage.setItem("WinnersList",winnersList);

    return {
        setImage :_setImage,
        getImagesList:_getImagesList,
        removeImage:_removeImage,
        setDefaultImageIndex :_setDefaultImageIndex,
        getDefaultImageIndex:_getDefaultImageIndex,
        setPrizeObj:_setPrizeObj,
        getPrizeList:_getPrizeList,
        deletePrize:_deletePrize,
        deleteAllPrize:_deleteAllPrize,
        setPrizeCandidates:_setPrizeCandidates,
        getPrizeCandidates:_getPrizeCandidates,
        getWinnersList:_getWinnersList,
        setWinnersList:_setWinnersList
    }
}]);