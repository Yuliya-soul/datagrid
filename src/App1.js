import React, { Component } from 'react';
import Loader from './Loader';
import Table from './Table';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import TableSearch from './TableSearch';
import { StickyContainer, Sticky } from 'react-sticky';
import './style.css';
import data1 from'./data';

class App extends Component {
  state ={
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc',  
    sortField: 'id',
    row: null,
    prevRow:0,
    currentPage: 0,
    search: '',
  }
 
 async componentDidMount() {
    const response = await fetch(` http://www.filltext.com/?rows=100&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&x1={randomDecimalRange}&category=["Mentor","Student","Activist"]&address={addressObject}&active={bool}&x={date|10-10-2010,10-12-2010}&description={lorem|32}`)
    const data = await response.json()

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

 searchHandler = search => {
   console.log(search)
     this.setState({search, currentPage: 0})
  }
 onRowSelect = row => {

   this.setState({row})
   document.getElementById(`${row.id}`).classList.add('main--main-bg');
   this.setState({prevRow: `${row.id}`})

 }
 pageChangeHandler = ({selected}) => (
  this.setState({currentPage: selected})
)
getFilteredData(){
  const {data, search} = this.state

  if (!search) {
    return data
  }

  return data.filter(item => {
    return item['firstName'].toLowerCase().includes(search.toLowerCase())
      || item['lastName'].toLowerCase().includes(search.toLowerCase())
      || item['email'].toLowerCase().includes(search.toLowerCase())
  })
}

  render() {
   const pageSize=10;
    const filteredData = this.getFilteredData();
    console.log(filteredData);
    
    return (
      <div className="container">
       
        <StickyContainer>
        {
        this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <TableSearch onSearch={this.searchHandler}/>
            <Table 
              data={this.state.data}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}

            />
          </React.Fragment>
      }

{
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      /> : null
      }
     
          
  <Sticky>{({ style }) => 
   <table className="table" style={{ cursor: "pointer" }}>
  <thead style={style}>
      <tr>
          <th>ID</th>
          <th>First Name</th> 
          <th> Last Name</th> 
          <th> Category</th> 
          <th >E-mail</th>
          <th>Phone</th>
           <th>Address</th>
          <th>Description</th>
          <th>Active</th>
          <th>Date</th>
          <th>Local date time</th>
          <th>Loan <br></br>index</th>
      </tr>
 </thead>
 </table>
 }
 </Sticky>
</StickyContainer>
   

   
      </div>

    );
  }
}

export default App;
