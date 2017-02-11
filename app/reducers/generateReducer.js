import immutable from 'immutable'

export default {
    messageReducer: function(prefix,state){
        const defaultState = state || immutable.fromJS({});
        return function reducer(state = defaultState,action) {
            switch (action.type) {
                case prefix + '_INIT': {
                    return state.merge(immutable.fromJS(action.payload)); 
                }
                case prefix + '_ADD': {
                    return state.merge(immutable.fromJS(action.payload));
                }
                case prefix + '_MERGE': {
                    return state.mergeDeep(immutable.fromJS(action.payload));
                }
                case prefix + '_CLEAR': {
                    let messages = state;
                    action.payload.forEach((history) => messages = messages.delete(history));
                    return messages;
                }
                default: {
                    return state;
                }
            }
        }
    },
    activeListReducer: function(prefix,state){
        const defaultState = state || immutable.fromJS({});
        return function reducer(state = defaultState,action){
            switch (action.type) {
                case prefix + '_INIT_LIST': {
                    return state.merge(immutable.fromJS(action.payload));
                }
                case prefix + '_ADD_ITEM': {
                    return state.merge(immutable.fromJS(action.payload));
                }
                case prefix + '_PUSH_HISTORY': 
                case prefix + '_UNSHIFT_HISTORY': {
                    let histories = state.getIn([action.payload._id,'histories'])
                    histories = histories || immutable.fromJS([]);
                    histories = action.type === prefix + '_UNSHIFT_HISTORY' ? 
                        immutable.fromJS(action.payload.histories).reverse().concat(histories)
                        :histories.concat(immutable.fromJS(action.payload.histories));
                    return state.setIn([action.payload._id,'histories'],histories);
                }
                default: {
                    return state;
                }
            }
        }
    }        
}