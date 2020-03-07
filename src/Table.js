import React from 'react';
import TextEllipsis from 'react-text-ellipsis';
function getTime(time){
   const moonLanding = new Date(`${time}`);
return moonLanding.getTime();
}

function NumberToLocale(number){
    const num = new Number(number).toLocaleString(`${navigator.languages[0]}`);;
    return num
} 
function Triangle(sort){
if (sort==='asc') return '▲'
if (sort==='desc') return '▼'
}

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small>{Triangle(props.sort)}</small> : null}
                 </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>
                      First Name  {props.sortField === 'firstName' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>
                    Last Name {props.sortField === 'lastName' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'category')}>
                    Category {props.sortField === 'category' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    E-mail {props.sortField === 'email' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    Phone {props.sortField === 'phone' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'address')}>
                    Address {props.sortField === 'address' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'description')}>
                    Description {props.sortField === 'description' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'active')}>
                    active  {props.sortField === 'active' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'date')} >
                    Date {props.sortField === 'date' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'localDateTime')}>
                    Local date time {props.sortField === 'localDateTime' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'LoanIndex')} >
                    Loan index {props.sortField === 'LoanIndex' ? <small>{Triangle(props.sort)}</small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            { props.data.map(item =>(
               <tr id={item.id} key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)} >
                    <td>{item.id+1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.category}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address.city}</td>
                     <td> 
                         <TextEllipsis 
                                lines={3} 
                                tag={'div'} 
                                ellipsisChars={'...'} 
                                tagClass={'className'} 
                                debounceTimeoutOnResize={400} 
                                useJsOnly={true} 
                                onResult={(result) => { 
                        //     if (result === TextEllipsis.RESULT.TRUNCATED)
                            //    console.log('text get truncated');
                            //   else 
                            //  console.log('text does not get truncated');
                                }}>
                                {item.description}
                        </TextEllipsis>
                    </td>  
                         <td>{''+item.active}</td>
                    <td>{''+getTime(item.x)}</td>
                    <td>{item.x}</td>
                            <td>{''+NumberToLocale(item.x1)}</td>
  
                </tr>
            ))}
        </tbody>
    </table>
)