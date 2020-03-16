
import React, { Component } from 'react';
import Toggle from 'react-toggle';
import Loader from './Loader';
import _ from 'lodash';
import TableSearch from './TableSearch';
import './style.css';
import data1 from'./data';
import TableFaker from './TableFaker';
import SelectButton from './Components/SelectButton';
import Select from 'react-select';
import {currencyOptions} from './Components/CurrencyMulti'


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
    selectedOption: null,
   
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
    const { selectedOption } = this.state;

    if (selectedOption!==null){
   const  choiceCurr =selectedOption.map(item=>item.value);
    choiceCurr.forEach(element => (console.log(`||item["currency"]==='${element}'`)),
    ) }
  
    if ((!search)&(CurrencySymbol==='')&(selectedOption===[]||selectedOption==null)) {
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
    item["email"].toLowerCase().includes(search.toLowerCase())) &item["isActive"]===this.state.IsActive
    &item["currency"]===this.state.CurrencySymbol
    //||item["currency"]==='$'
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
handleCurrencyChange = selectedOption => {
  this.setState(
    { selectedOption },

    () => console.log(`Option selected:`, this.state.selectedOption)
  );
    
};
onRowSelect = row => {
  this.setState({row});
  document.getElementById(`${row.id}`).classList.add('main--main-bg');
  this.setState({prevRow: `${row.id}`})

}
Delete= () => {
  var matches = document.querySelectorAll("tr.main--main-bg");
console.log(matches)


matches.forEach(function(userItem) {
  (userItem).classList.add('hide1');
});
}
  render() {
    const filteredData = this.getFilteredData();
    const { selectedOption } = this.state;

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
             <Select
                isMulti
                name="currency"
                 options={currencyOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedOption}
               onChange={this.handleCurrencyChange}
      
              />
         </div>
         <button 
            className="btn btn-outline-secondary"
            onClick={this.Delete} >Hide row
          </button>
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