var router = require('koa-router')()
  , body = require('koa-better-body')
  , uploadFile = require('../util/uploadImage');

router.post('/file',body(),function*(next){
    let file = this.request.files[0];
    let type = file.name.split('.');
    let key = file.path.split('/');
    key = key[key.length-1];
    if(type.length > 1) key = key + '.' + type[type.length-1];
    console.log(key);
    let ret = yield uploadFile(key,file.path);
    this.body = ret;
})

module.exports = router;
