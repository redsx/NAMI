export const UPLOAD_URL = '/upload/file'; 
export const ajaxHandle = {
    request: function(method,url,postData,progress) {
        return new Promise((resolve,reject)=>{
            let xhr = this.createXhr();
            xhr.open(method,url,true);
            postData ? xhr.send(postData) : xhr.send(null);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304 ){
                        resolve(JSON.parse(xhr.responseText));
                    } else{
                        reject(new Error('response error status:',xhr.status))
                    }
                }
            }
            xhr.upload.onprogress = progress;
        })
    },
    createXhr: function() {
        let methods = [
            function () {return new XMLHttpRequest() },
            function () {return new ActiveXObject('MSXML2.XMLHttp.6.0') },
            function () {return new ActiveXObject('MSXML2.XMLHttp.3.0') },
            function () {return new ActiveXObject('MSXML2.XMLHttp') }
        ];
        for(var i=0;i<methods.length;i++){
            try {
                methods[i]();
            } catch(ex) {
                continue;
            }
            this.createXhr = methods[i];
            return methods[i]();
        }
    }
}
export default ajaxHandle;
