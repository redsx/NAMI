import { BATCHED_ACTIONS } from '../constants/batched.js'
export default function batchReducer(rootReducer){
    return (state,action) => {
        if(action.type === BATCHED_ACTIONS){
            const nextState = action.payload.reduce(rootReducer,state);
            return nextState;
        }
        return rootReducer(state,action);
    }
}