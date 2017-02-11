var router = require('koa-router')()
  , body = require('koa-better-body')
  , uploadFile = require('../util/uploadImage');

router.post('/file',body(),function*(next){
    let file = this.request.files[0];
    let key = file.path.split('/');
    key = key[key.length-1];
    let ret = yield uploadFile(key,file.path);
    this.body = ret;
})

module.exports = router;
