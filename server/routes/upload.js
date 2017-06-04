var router = require('koa-router')()
  , body = require('koa-better-body')
  , fs = require('fs')
  , uploadFile = require('../util/uploadImage');

router.post('/file',body(),function*(next){
    const targetPath = './tmp/upload';
    let file = this.request.files[0];
    let type = file.name.split('.');
    let key = file.path.split('/');
    key = key[key.length-1];
    if(type.length > 1) key = key + '.' + type[type.length-1];
    let ret = yield uploadFile(key,file.path);
    fs.rename(file.path, targetPath, (err)=>console.error(err));
    this.body = ret;
})

module.exports = router;
