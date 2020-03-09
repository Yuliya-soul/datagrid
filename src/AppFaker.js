
import React, { Component } from 'react';
import Toggle from 'react-toggle';
import Loader from './Loader';
import _ from 'lodash';
import TableSearch from './TableSearch';
import './style.css';
import data1 from'./data';
import TableFaker from './TableFaker';
import ReactPaginate from 'react-paginate';


class AppFaker extends Component {
  state ={
    isLoading: false,
    data: data1.data1,
    sort: 'asc',  
    sortField: 'id',
    row: null,
    prevRow:0,
    currentPage: 0,
    search: '',
    filteredData:'',
    IsActive: false,
}
  searchHandler = search => {
    this.setState({search});
  }
  
  getFilteredData(){
    const {search} = this.state;
    const {data} = this.state;
    if (!search) {
     
    return data
    }
    var result = data.filter(item => {
    return (
    item["name"].toLowerCase().includes(search.toLowerCase()) ||
    item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
    item["email"].toLowerCase().includes(search.toLowerCase())
    );
    });
    if(!result.length){
    result = data
    }
    return result
  }
  onSort = sortField => {
  let {data} = this.state;
    const cloneData = data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField})
 }

handleActiveChange= IsActive=> {
  if (!this.state.IsActive){this.setState({ IsActive:true})}
  else {this.setState({ IsActive:false})}
}
  render() {
    const filteredData = this.getFilteredData();
       return (
      <div className="container">
     {this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <TableSearch onSearch={this.searchHandler}/>
            <Toggle
              defaultChecked={this.state.IsActive}
              onChange={this.handleActiveChange} />
             <span>Active Students Only {''+JSON.stringify(this.state.IsActive)}</span> 
             <TableFaker 
              filteredData={filteredData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
            />
          </React.Fragment>
      }

      </div>
 
     );
   }
 }
 
 export default AppFaker;