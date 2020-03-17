import { SORT_DATA } from '../actions/types';

const initialState = {
    isSorted: false,
    data: [],
    sort:'',
    sortField:'rank',
    isActive:false
}

export default (state = initialState, action) => {
  
    switch(action.type) {
        case SORT_DATA: return {
            isSorted: true,
            data: action.payload.newData,
            sort: action.payload.sort,
            sortField: action.payload.sortField,
            isActive:state.isActive
        };
        case "FILTERED_DATA": 
            return {
                ...state,
                data: action.payload.newData,
                isActive: action.payload.isActive
            }
        default: return state;
    }
}