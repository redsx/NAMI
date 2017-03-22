import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

let store;
if(process.env.NODE_ENV === 'development'){
    store = createStore(reducer, composeWithDevTools(
        applyMiddleware(thunk)
    ));
} else{
    const finalCreactStore = applyMiddleware(thunk)(createStore);
    store = finalCreactStore(reducer);
}
let unsubscribe = store.subscribe(() =>{
    // console.log('store监控:', store.getState().toJS())
    }
);
export default store;
