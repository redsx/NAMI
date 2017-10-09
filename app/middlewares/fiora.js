import pluginConfig from '../config/plugins.js'

const fioraMiddleware = {
    dealFioraMessage: function(message){
        if(message.owner.nickname === pluginConfig.PLUGIN_ROBOT){
            let fioraMsg = {};
            try{
                fioraMsg = JSON.parse(message.content);
            } catch(err){
                return message;
            }
            if(typeof fioraMsg !== 'object'){
                return message;
            }
            if(fioraMsg.type === 'code'){
                fioraMsg.type = 'text';
                fioraMsg.content = '移步 https://fiora.suisuijiang.com 查看代码';
            }
            const reg = /^https?:/;
            if(!reg.test(fioraMsg.avatar)){
                fioraMsg.avatar = pluginConfig.DEFAULT_AVATAR;
            }
            fioraMsg = {
                owner: {
                    nickname: `fiora-${fioraMsg.name}`,
                    avatar: fioraMsg.avatar,
                    _id: message.owner._id,
                },
                _id: message._id,
                content: fioraMsg.content,
                isPrivate: message.isPrivate,
                room: message.room,
                type: message.type,
                timestamp: message.timestamp,
            }
            return fioraMsg;
        }
        return message;
    }
}
export default fioraMiddleware;