import io from 'socket.io-client'
import config from '../config/socketConfig.js'

if(process.env.NODE_ENV === 'development'){
    module.exports = io('http://'+config.development.HOST+':'+config.development.PORT,{'force new connection': true});
} else{
    module.exports = io('http://'+config.production.HOST+':'+config.production.PORT,{'force new connection': true});
}