import { socketEmit, dispatchAction } from './common.js'

export const disconnect = socketEmit('frontDisconnect');