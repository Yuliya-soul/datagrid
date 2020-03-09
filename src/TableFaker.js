import React from 'react';
import TextEllipsis from 'react-text-ellipsis';
import { StickyContainer, Sticky } from 'react-sticky';


function Triangle(sort){
if (sort==='asc') return '▲'
if (sort==='desc') return '▼'
}

export default props => (
        
  <StickyContainer>
    <table className="table" style={{ cursor: "pointer" }}>
        <thead className="header" >
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                  ID{props.sortField === 'id' ? <small>{Triangle(props.sort)}</small> : null}
                 </th>
                <th onClick={props.onSort.bind(null, 'rank')}>
                  Rank{" "} {props.sortField === 'rank' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                  Name{" "}{props.sortField === 'name' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>
                  Last Name{props.sortField === 'lastName' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                  E-mail{" "}{props.sortField === 'email' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'LocationName')}>
                   LocationName {props.sortField === 'LocationName' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'isActive')}>
                   isActive {props.sortField === 'isActive' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                   Phone {props.sortField === 'phone' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                 <th onClick={props.onSort.bind(null, 'description')} >
                   Description {props.sortField === 'description' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'idNumber')}>
                   Id Number {props.sortField === 'idNumber' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'date')}>
                  Date {props.sortField === 'date' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'payment')} >
                 Payment{props.sortField === 'payment' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'currency')} >
                  Currency{props.sortField === 'currency' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            { props.filteredData.map(item =>(
     <tr id={item.id} key={item.id + item.phone}  >
          <td>{item.id+1}</td>
          <td>{item.rank}</td>
          <td>{item.name}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.LocationName}</td>
          <td>{''+item.isActive}</td>
          <td>{item.phone}</td>
          <td> 
            <TextEllipsis 
              lines={2} 
              tag={'div'} 
              ellipsisChars={'...'} 
              tagClass={'className'} 
              debounceTimeoutOnResize={400} 
              useJsOnly={true} 
             >
              {item.description}
            </TextEllipsis>
          </td>  
          <td>{item.idNumber}</td>
          <td>
            <TextEllipsis 
              lines={3} 
              tag={'div'} 
              ellipsisChars={'...'} 
              tagClass={'className'} 
              debounceTimeoutOnResize={100} 
              useJsOnly={true} 
              >
             {''+(item.date) }
            </TextEllipsis>
            </td>
          <td>{item.payment}</td>
          <td>{item.currency}</td>
      </tr>
  
      ))}
   
    
        </tbody>
    </table>
    <Sticky>{({ style }) => 
   <table className="table" style={{ cursor: "pointer" }}>
  <thead style={style}>
      <tr>
          <th>ID</th>
          <th>Rank</th> 
          <th>Name</th> 
          <th>Last Name</th> 
          <th>E-mail</th>
          <th>LocationName</th>
          <th>isActive</th>
          <th>Phone</th>
          <th>Description</th>
          <th>Id Number</th>
          <th>Date</th>
          <th>Payment</th>
          <th>Currency</th>
      </tr>
 </thead>
 </table>
 }
 </Sticky>
    </StickyContainer>
)      
      

