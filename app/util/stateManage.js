import immutable from 'immutable'
export default {
    getCurRoomInfo: function (state){
        const curRoom = state.getIn(['user','curRoom']);
        let curRoomInfo = state.getIn(['activeList',curRoom]);
        curRoomInfo = curRoomInfo || immutable.fromJS({histories:[]});
        return curRoomInfo;
    }
}