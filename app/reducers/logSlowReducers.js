export default function logSlowReducers(reducers, threshouldInMs = 8){
    Object.keys(reducers).forEach((name)=>{
        const originalReducer = reducers[name];
        reducers[name] = (state,action) => {
            const start = Date.now();
            const resault = originalReducer(state,action);
            const diffInMs = Date.now() - start;
            if(diffInMs > threshouldInMs){
                console.warn(`Reducer ${name} took ${diffInMs} ms for ${action.type} `);
            }
            return resault;
        }
    })
    return reducers;
}