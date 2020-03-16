import { SORT_DATA } from './types';
import _ from 'lodash';

export const sortData = (sortField,sort) => (dispatch, getState) => {
  let newData = _.orderBy(getState().sortedData.data.length === 0 ? getState().data.data : getState().sortedData.data, sortField, sort);
  let isActive=false
  dispatch({type: SORT_DATA, payload: {newData, sortField, sort,isActive} });
     
}
export const filtered=(search)=>(dispatch,getState)=>{
  if (search !== "") {
    const newData = getState().data.initData.filter(item => 
      item["name"].toLowerCase().includes(search.toLowerCase())
    );
    dispatch({type: 'FILTERED_DATA', payload: {newData: newData}});
  } else dispatch({type: 'RESTART', payload: {newData: getState().data.initData}});
}
export const filteredLastName=(search)=>(dispatch,getState)=>{
  if (search !== "") {
    const newData = getState().data.initData.filter(item => 
      item["lastName"].toLowerCase().includes(search.toLowerCase())
    );
    dispatch({type: 'FILTERED_DATA', payload: {newData: newData}});
  } else dispatch({type: 'RESTART', payload: {newData: getState().data.initData}});
}
export const filteredEmail=(search)=>(dispatch,getState)=>{
  if (search !== "") {
    const newData = getState().data.initData.filter(item => 
      item["email"].toLowerCase().includes(search.toLowerCase())
    );
    dispatch({type: 'FILTERED_DATA', payload: {newData: newData}});
  } else dispatch({type: 'RESTART', payload: {newData: getState().data.initData}});
}
export const setIsActiveState=(activeSt)=>(dispatch,getState)=>{
    const newData = activeSt ? getState().data.initData.filter(item => 
      item["isActive"] === `${activeSt}`
    ) : getState().data.initData;
    dispatch({type: 'FILTERED_DATA', payload: {newData, isActive: activeSt} });
  // }
}

