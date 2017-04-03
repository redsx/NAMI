import config from '../config/config.js'
import language from '../config/language.js'
import { ajaxHandle, UPLOAD_URL } from './ajax.js'
export default function uploadHandle(uploadFile){
    // function detectImage(){
    //     let isImgReg = /image\/\w+/;
    //     if(!uploadFile || !isImgReg.test(uploadFile.type)) throw 'ERROR1006';
    //     if(detectSize(config.MAXFileSize)) throw 'ERROR1007';
    // }
    function detectSize(size){
        if(uploadFile.size > size*1024*1024) {throw 'ERROR1007'};
    }
    function convertBase64UrlToBlob(urlData){
        let bytes = window.atob(urlData.split(',')[1]);
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob( [ab] , {type : 'image/png'});
    }
    function uploadProgress(progress){
        return function(event){
            if(event.lengthComputable){
                let persent = Math.floor((event.loaded/event.total)*100);
                progress(persent);
            }
        }
    }
    function getImageSize(urlData){
        let img = new Image();
        img.src = urlData;
        const width = img.width,
            height = img.height;
        return {width,height}
    }
    function comporessImage(urlData,canvas){
        let img = new Image();
        img.src = urlData;
        canvas = canvas || document.getElementById('canvas');
        let percentage = config.CompressAvatarSize/img.width > 1 ? 1 : config.CompressAvatarSize/img.width,
            ctx = canvas.getContext("2d");
        let width = img.width*percentage,
            height = img.height*percentage;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0,width,height);
        ctx.drawImage(img,0,0,width,height);
        try{
            uploadFile = convertBase64UrlToBlob(canvas.toDataURL('image/jpeg'));
        } catch(err) {
            console.warn(err);
        }
    }
    function getUrlData(){
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadFile);
            fileReader.onload = (event) => {
                const imgDataUrl = event.target.result;
                resolve(imgDataUrl);
            }
            fileReader.onerror = (err) => { 
                reject('ERROR1008');
            }
        })
    }
    function getFileInfo(){
        let size = uploadFile.size/1024;
        size = size > 1024 ? (size/1024).toFixed(2) + ' MB' : size.toFixed(1) + ' KB'; 
        return {fileName: uploadFile.name, size: size };
    }
    function upload(detect = true,progress){
        detect && detectSize(config.MAXFileSize);
        let formdata = new FormData();
        formdata.append('smfile',uploadFile);
        let progressEvent = typeof progress === 'function' ? uploadProgress(progress): null;
        return ajaxHandle.request('POST',UPLOAD_URL,formdata,progressEvent);
    }
    return { getUrlData, comporessImage, upload, detectSize, getFileInfo, getImageSize }
}