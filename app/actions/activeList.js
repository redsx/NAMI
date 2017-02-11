import { socketEmit, dispatchAction } from './common.js'
import { INIT_ROOM_LIST, ADD_ROOM_ITEM, MERGE_ROOM_INFO } from '../constants/activeList.js'

export const getRoomList = socketEmit('initRoomList');
export const getPrivateList = socketEmit('initPrivateList');

export const initRoomList = dispatchAction(INIT_ROOM_LIST);
export const addRoomItem = dispatchAction(ADD_ROOM_ITEM);
export const mergeRoomInfo = dispatchAction(MERGE_ROOM_INFO);

export const getRoomItem = socketEmit('initRoomItem');
export const getPrivateItem = socketEmit('initPrivateItem');

export const getRoomInfo = socketEmit('getRoomInfo');
export const updateRoomInfo = socketEmit('updateRoomInfo');
export const getInviteLink = socketEmit('getInviteLink');
export const refreshInviteLink = socketEmit('refreshInviteLink');

export const getPrivateInfo = socketEmit('getPrivateInfo');

