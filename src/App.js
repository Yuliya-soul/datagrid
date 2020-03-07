
import React, { Component } from 'react';
import Loader from './Loader';
import Table from './Table';
import _ from 'lodash'
//var faker = require('faker');


//faker.locale = 'ru';
//faker.seed(123);
//var user = { login: faker.internet.email(), name: faker.name.firstName(), surname: faker.name.lastName(), country: faker.address.country(), avatar: faker.image.avatar(), }
 
//console.log(user);

class App extends Component {
  state ={
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc',  // 'desc'
    sortField: 'id',
    row: null,
    prewrow:null,
  }
 async componentDidMount() {
    const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&x1={randomDecimalRange}&category=["Mentor","Student","Activist"]&address={addressObject}&active={bool}&x={date|10-10-2010,10-12-2010}&description={lorem|32}`)
    const data = await response.json()
    //console.log(data)
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })

  }

  
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField})
   
 }
 
 onRowSelect = row => {
 
  document.getElementById(`${row.id}`).classList.add('main--main-bg');
 
  console.log(document.getElementById(`${row.id}`));
  document.getElementById(`${row.id}`).classList.add('main--main-bg');
 
 }


  

  render() {
    return (
      <div className="container">
      {
       this.state.isLoading 
        ? <Loader />
        : <Table 
        data={this.state.data}
        onSort={this.onSort}
        sort={this.state.sort}
        sortField={this.state.sortField}
        onRowSelect={this.onRowSelect}
        />
        
      }
      
      </div>
      
    );
  }
}

export default App;
