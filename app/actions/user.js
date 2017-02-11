import { socketEmit, dispatchAction } from './common.js'
import { MERGE_USER_INFO } from '../constants/user.js'

export const login = socketEmit('login');
export const signUp = socketEmit('signUp');
export const getUserInfo = socketEmit('getUserInfo');
export const createRoom = socketEmit('createRoom');
export const updateUserInfo = socketEmit('updateUserInfo');
// payload object
export const mergeUserInfo = dispatchAction(MERGE_USER_INFO);
