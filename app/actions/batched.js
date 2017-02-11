import { dispatchAction } from './common.js'
import { BATCHED_ACTIONS } from '../constants/batched.js'

//payload array [{type,payload}, ...];
export const batchedActions = dispatchAction(BATCHED_ACTIONS);
