const mongoose = require('mongoose')
    , jwt = require('jsonwebtoken')
    , JWT_KEY = require('../config/cr-config').JWT_KEY
    , config = require('../config/cr-config.js');
const Schema = mongoose.Schema;
const conversation = new Schema({
    from: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    relation: [{
      type: Schema.Types.ObjectId,
      ref: 'relation'
    }],
    histories: [{
      type: Schema.Types.ObjectId,
      ref: 'private'
    }]
});
conversation.statics.getConv = function(ids) {
  return new Promise((resolve, reject) => {
    this.find(
      {
        from: {$in: ids},
        to: {$in: ids}
      },
      (err, ret) => {
        if(err) {
          reject(err);
        } else {
          if(ret.length < 2) {
            return resolve(ret[0]);
          }
          for(let i = 0; i < ret.length; i++) {
            const conv = ret[i];
            if(conv.from !== conv.to) {
              return resolve(conv);
            }
          }
        }
      }
    )
  })
  
} 
module.exports = mongoose.model('conversation', conversation);
