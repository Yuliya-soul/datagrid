import React from "react";
import clsx from "clsx";
import memoize from "memoize-one";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Container,
  Paper,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import TextEllipsis from 'react-text-ellipsis';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import columns from './Components/Columns';
import useTableStyles from'./Components/useTableStyles';
import useStyles from './Components/UseStyles';
import { sortData, add, selectCell,filtered,filteredLastName,filteredEmail,setIsActiveState } from './actions';
import './style.css';
import { Popover, Button } from 'antd';
import 'antd/dist/antd.css';
import Toggle from 'react-toggle';

const sortingState = ["", "asc", "desc"];



const TableColumns = ({ classes, columns }) => {
    const sortedData = useSelector(state => state.sortedData);
   
    console.log(sortedData)
 const dispatch = useDispatch();

  return (
    <TableRow component="div" className={clsx(classes.row, classes.headerRow)} style={{ cursor: "pointer" }}>
       {columns.map((column, colIndex) => {
          return (
         <TableCell 
                key={colIndex}
                component="div"
                variant="head"
                align={column.numeric || false ? "right" : "left"}
                className={clsx(
                  classes.cell,
                  classes.column,
                  !column.width && classes.expandingCell,            
                )} 
                style={{
                  flexBasis: column.width || false,
                  height: ROW_SIZE
                }}
                scope="col"
              >
              {  <span onClick={() => dispatch(sortData(column.dataKey,sortingState[(sortingState.findIndex(i => i===sortedData.sort)+1)%sortingState.length]))} >
              {column.dataKey!=='isActive'? <span  className={`sort-by${column.dataKey === sortedData.sortField? sortedData.sort: ""}`} > </span>:null }
                     {column.label} {" "}
                </span>
              }
              
              {column.dataKey  === 'name' ?
                <Popover placement="rightBottom"
                      content={<input type="text" 
                        onChange={(event) => dispatch(filtered(event.target.value))}
                        ></input>} title="Name search">
                       <Button >
                       <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                         <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                       </Button>
                </Popover>:null
              }
              {column.dataKey  === 'lastName' ?
                <Popover placement="rightBottom"
                      content={<input type="text" 
                        onChange={(event) => dispatch(filteredLastName(event.target.value))}
                        ></input>} title="Last Name search">
                       <Button >
                       <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                         <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                       </Button>
                </Popover>:null
              }
              {column.dataKey  === 'email' ?
                <Popover placement="rightBottom"
                      content={<input type="text" 
                        onChange={(event) => dispatch(filteredEmail(event.target.value))}
                        ></input>} title="Email search">
                       <Button >
                       <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                         <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                       </Button>
                </Popover>:null
              }
              
        </TableCell>
             
            
        );
      })}
     
    </TableRow>
  );
};

const ROW_SIZE = 60;

const Row = ({ index, style, data: { columns, items, classes } }) => {
  const item = items[index];

  return (
    <TableRow component="div" className={classes.row} style={style} id={item.id}>
       {columns.map((column, colIndex) => {
        return (
          <TableCell
                key={item.id + colIndex}
                component="div"
                variant="body"
                align={column.numeric || false ? "right" : "left"}
                className={clsx(
                  classes.cell,
                  !column.width && classes.expandingCell,column.dataKey
                )}
                style={{
                  flexBasis: column.width || false,
                  height: ROW_SIZE
                }}
              >
                <TextEllipsis 
                    lines={2} 
                    tag={'div'} 
                    ellipsisChars={'...'} 
                    tagClass={'className'} 
                    debounceTimeoutOnResize={400} 
                    useJsOnly={true} 
                >
                    {item[column.dataKey]}
                 </TextEllipsis>
          
          </TableCell>
        );
      })}
    </TableRow>
  );
};


const itemKey = (index, data )  => data.items[index].id;

const createItemData = memoize((classes, columns, data) => ({
  columns,
  classes,
  items: data
}));

const ReactWindowTable = ({ columns}) => {
  const classes = useTableStyles();
  const data = useSelector(state => state.data.data);
 // console.log(data);
  const sortedData = useSelector(state => state.sortedData);
  console.log(itemKey)
  if (sortedData.isSorted) {
    const itemData = createItemData(classes, columns, sortedData.data);
    return (
      <div className={classes.root}>
        <Table className={classes.table} component="div">
          <TableHead component="div" className={classes.thead}>
            <TableColumns classes={classes} columns={columns} />
          </TableHead>
          <TableBody component="div" className={classes.tbody}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                    className={classes.list}
                    height={height}
                    width={width}
                    itemCount={data.length}
                    itemSize={ROW_SIZE}
                    itemKey={itemKey}
                    itemData={itemData}
                >
                
                     {Row}
                </List>
              )}
            </AutoSizer>
        </TableBody>
        </Table>
      </div>
    );
  }
  const itemData = createItemData(classes, columns, data);
  return (
    <div className={classes.root}>
      <Table className={classes.table} component="div">
        <TableHead component="div" className={classes.thead}>
          <TableColumns classes={classes} columns={columns} />
        </TableHead>

        <TableBody component="div" className={classes.tbody}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={classes.list}
                height={height}
                width={width}
                itemCount={data.length}
                itemSize={ROW_SIZE}
                itemKey={itemKey}
                itemData={itemData}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </TableBody>
      </Table>
    </div>
  );
};

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const active = useSelector(state => state.sortedData.isActive);
  return (
    <div className={classes.root}>
       <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h2" variant="h5" className={classes.title}>
            <Toggle 
            defaultChecked={active}
            onChange={() => dispatch(setIsActiveState(!active))}/>
                 
                {"Users list table"}
              </Typography>

            <div className={classes.spacer} />
          </Toolbar>

          <ReactWindowTable columns={columns} />
        </Paper>
      </Container>
     
    </div>       
        
  );
};

export default App;
