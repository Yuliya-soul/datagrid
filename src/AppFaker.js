
import React, { Component } from 'react';
import Toggle from 'react-toggle';
import Loader from './Loader';
import _ from 'lodash';
import TableSearch from './TableSearch';
import './style.css';
import data1 from'./data';
import TableFaker from './TableFaker';
import ReactPaginate from 'react-paginate';
import SelectButton from './Components/SelectButton'



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
    CurrencySymbol: null,
}
  searchHandler = search => {
    this.setState({search});
  }

  setCurrencySymbol = value => {
     this.setState({CurrencySymbol: value});
  }
  
  getFilteredData(){
    const {search} = this.state;
    const {data} = this.state;
const{CurrencySymbol}=this.state;

    if ((!search)&(CurrencySymbol==='')) {
       var result = data.filter(item => {
        return (
        item["isActive"]===this.state.IsActive)
              });
    return result
    }
   result = data.filter(item => {
    return (
    (item["name"].toLowerCase().includes(search.toLowerCase()) ||
    item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
    item["email"].toLowerCase().includes(search.toLowerCase()) )&item["isActive"]===this.state.IsActive
    &item["currency"]===this.state.CurrencySymbol
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
             <span>Active users state{''+JSON.stringify(this.state.IsActive)}</span> 
             <div>
      
             <SelectButton setValue={this.setCurrencySymbol} />
    </div>
          
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