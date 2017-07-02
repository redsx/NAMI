import { dispatchAction } from './common.js'
import { BATCHED_ACTIONS, INIT_STATE } from '../constants/batched.js'

//payload array [{type,payload}, ...];
export const batchedActions = dispatchAction(BATCHED_ACTIONS);
export const initState = dispatchAction(INIT_STATE);
