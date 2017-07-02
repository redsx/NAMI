import { combineReducers } from 'redux-immutable'
import batchReducer from './batchReducer.js'
import logSlowReducers from './logSlowReducers.js'
import pageUI from './pageUI.js'
import user from './user.js'
import messages from './messages.js'
import activeList from './activeList.js'

// const roomMsg = generateReducer.messageReducer('MESSAGES'),
//       privateMsg = generateReducer.messageReducer('PRIVATE'),
//       privateList = generateReducer.activeListReducer('PRIVATE'),
//       roomList = generateReducer.activeListReducer('ROOM');

// const activeList = generateReducer.activeListReducer('ROOM'),
    //   messages = generateReducer.messageReducer('MESSAGES');
    
let reducers = {
    pageUI,
    user,
    activeList,
    messages,
}
if(process.env.NODE_ENV === 'development'){
    reducers = logSlowReducers(reducers,1);
}
const rootReducer = combineReducers(reducers);
export default batchReducer(rootReducer);