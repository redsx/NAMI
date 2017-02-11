const qiniu = require("qiniu");
const config = require('../config/cr-config');

qiniu.conf.ACCESS_KEY = config.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.QINIU_SECRET_KEY;
module.exports = function uploadFile(key,filePath){
    //要上传的空间
    bucket = config.QINIU_BUCKET;
    //构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }
    //生成上传 Token
    token = uptoken(bucket, key);
    //构造上传函数
    return new Promise(function(resolve,reject){
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(token, key, filePath, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log('上传成功， 处理返回值');
                resolve({success: true, src: config.QINIU_CNAME+ '/' + ret.key});
            } else {
                // 上传失败， 处理返回代码
                console.log('上传失败， 处理返回值');
                resolve({success: false, errMsg: '上传失败'});
            }
        });
    })
}