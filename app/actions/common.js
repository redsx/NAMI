import store from '../store/index.js'
import socket from './socket.js'
import { bindActionCreators } from 'redux'

const dispatch = store.dispatch;
export const dispatchAction = (type) => (payload) => dispatch({ type, payload });
export const dispatchThunk = (thunk) => bindActionCreators(thunk,dispatch);
export const socketEmit = (event) => (arg) => {
    return new Promise((resolve,reject) => {
        socket.emit(event,arg,(resault)=>{
            if(resault.isError){
                reject(resault.errMsg);
            }
            resolve(resault);
        })
    })
}