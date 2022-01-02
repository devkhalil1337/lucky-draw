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

    let _getImagesList = () => {
        let imageList = localStorage.getItem("backgroundImage");
        if(!imageList)
            return [];
        return JSON.parse(imageList);
    }


    return {
        setImage :_setImage,
        getImagesList:_getImagesList
    }
}]);