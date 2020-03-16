import initialState from '../newData';

export default (state = initialState, action) => {
    switch(action.type) {
        case 'RESTART': return initialState;
         case 'FILTERED_DATA':return{...state, data:action.payload.newData}
        default: return state;
    }
}