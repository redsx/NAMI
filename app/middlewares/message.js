import immutable from 'immutable'
export default {
    priToGro: function(message,room,user){
        if(message.get('owner')) {
            message = message.set('isPrivate',false);
            return message;
        };
        message = message.set('isPrivate',true);
        const userId = user.get('_id'),
              fromId = message.get('from'),
              roomId = room.get('_id');
        let owner;
        if(fromId === roomId){ 
            owner = immutable.fromJS({
                _id: roomId,
                avatar: room.get('avatar'),
                nickname: room.get('name'),
            });
        }
        if(fromId === userId) {
            owner = immutable.fromJS({
                _id: userId,
                avatar: user.get('avatar'),
                nickname: user.get('nickname'),
            });
        }
        return message.set('owner',owner);
    }
}