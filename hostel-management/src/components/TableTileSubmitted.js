import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Button,Backdrop,Chip} from '@material-ui/core';
import DetailInfo from './DetailInfo';
import {useAuth} from './../context/auth';
import axios from 'axios';

function createData(eid, fname, lname, dept, details, email, status) {
  return { eid, fname, lname, dept, details, email, status};
}



const populateRows = (data) => {
  
  let temprows = []
  const filterRows = data.filter((obj) => obj.submittedStatus===2)
  temprows = filterRows.map((obj) => {return createData(obj.enrollId, obj.fname, obj.lname, obj.dept, "View full profile", obj.email, obj.submittedStatus)})
  return temprows
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'eid', numeric: false, disablePadding: true, label: 'Enrollment Id' },
  { id: 'fname', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lname', numeric: false, disablePadding: false, label: 'Second Name' },
  { id: 'dept', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'details', numeric: false, disablePadding: false, label: 'Details' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));


const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected &emsp;
          <Chip label="Verify" variant="outlined" color="primary" style={{marginTop:2,marginBottom:2}} onClick={props.onVerify}/> &emsp;  
          <Chip label="Reject" variant="outlined" color="secondary" style={{marginTop:2,marginBottom:2}} onClick={props.onReject}/>&emsp;
          <Chip label="Accept" variant="outlined" color="primary" style={{marginTop:2,marginBottom:2}} onClick={props.onAccept}/> &emsp;
        </Typography>
        
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Submitted Applicants
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const TableTileSubmitted = (props) => {

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('eid');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [backdropOpen,setBackdrop] = React.useState(false);
  const [currentClicked, setCurrentClicked] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [allData,setAllData] = React.useState([])

  const authkey = useAuth().authTokens
  const options = {
      headers: {'authorization': authkey}
  };

  React.useEffect(() => {

    axios.get('http://127.0.0.1:3001/allUsers',options)
    .then((result) => {
      setAllData(result.data)
      setRows(populateRows(result.data))
    })
    .catch((err) => {
      console.log(err)
    })
    

  },[])
  
  
  
  const handleRowChange = (currData) => {
      setRows(currData)
  }
  const handleCurrentClicked = (selectedRow) => {
    let val = allData.filter((data) => (data.enrollId === selectedRow.eid))
    setCurrentClicked(val[0])
  }
  const handleBackdropClose = () => {
      setBackdrop(false);
  }

  const handleBackdropOpen = () => {
    setBackdrop(!backdropOpen)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.eid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);

  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVerify = () => {
      
      /*  get the selected elements and mark them verified, save the data in database
          Update data in server.
          If successfull change the selected status, populateRows(newData)
      */

      let temprows = [];
      let eidMappedtoIndex = {}
      let selectedEmailList = []
      rows.forEach((row,index)=> {
        eidMappedtoIndex[row.eid] = index
      })
      
      selected.forEach((elem) => {
        rows[eidMappedtoIndex[elem]].submittedStatus = 3
        selectedEmailList.push(rows[eidMappedtoIndex[elem]].email)
      });
      rows.forEach((row) => {
        if(rows[eidMappedtoIndex[row.eid]].submittedStatus!==3) {
          temprows.push(row)
        }
      });

      setSelected([])
      handleRowChange(temprows)
      
      axios.patch('http://127.0.0.1:3001/patchStatus/', {selectedEmailList,submittedStatus:3}, options)
      .then(()=>{})
      .catch(() => {})
  }
  const handleReject = () => {
      
    /*  get the selected elements and mark them verified, save the data in database
        Update data in server.
        If successfull change the selected status, populateRows(newData)
    */

    let temprows = [];
    let eidMappedtoIndex = {}
    let selectedEmailList = []
    rows.forEach((row,index)=> {
      eidMappedtoIndex[row.eid] = index
    })
    selected.forEach((elem) => {
      rows[eidMappedtoIndex[elem]].submittedStatus = 5
      selectedEmailList.push(rows[eidMappedtoIndex[elem]].email)
      
    })
    rows.forEach((row) => {
      if(rows[eidMappedtoIndex[row.eid]].submittedStatus!==5) {
        temprows.push(row)
      }
    });
    setSelected([])
    handleRowChange(temprows)
    
    axios.patch('http://127.0.0.1:3001/patchStatus/', {selectedEmailList,submittedStatus:5}, options)
    .then(()=>{})
    .catch(() => {})
  } 

  const handleAccept = () => {
      
    /*  get the selected elements and mark them verified, save the data in database
        Update data in server.
        If successfull change the selected status, populateRows(newData)
    */

    let temprows = [];
    let eidMappedtoIndex = {}
    let selectedEmailList = []
    rows.forEach((row,index)=> {
      eidMappedtoIndex[row.eid] = index
    })
    selected.forEach((elem) => {
      rows[eidMappedtoIndex[elem]].submittedStatus = 4
      selectedEmailList.push(rows[eidMappedtoIndex[elem]].email)
    });
    rows.forEach((row) => {
      if(rows[eidMappedtoIndex[row.eid]].submittedStatus!==4) {
        temprows.push(row)
      }
    });

    setSelected([])
    handleRowChange(temprows)
    
    axios.patch('http://127.0.0.1:3001/patchStatus/', {selectedEmailList,submittedStatus:4}, options)
    .then(()=>{})
    .catch(() => {})
  } 

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} onVerify={handleVerify} onReject={handleReject} onAccept={handleAccept} />
        <TableContainer style={{maxHeight:400}}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.eid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.eid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.eid}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                        {row.eid}
                      </TableCell>
                      <TableCell align="left">{row.fname}</TableCell>
                      <TableCell align="left">{row.lname}</TableCell>
                      <TableCell align="left">{row.dept}</TableCell>
                      <TableCell align="left">
                        <Button variant="outlined" color="primary" onClick={() => {handleBackdropOpen(); handleCurrentClicked(row);}}>
                          {row.details}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              <Backdrop open={backdropOpen} onClick={handleBackdropClose} className={classes.backdrop}>
                  <DetailInfo information={currentClicked} />
              </Backdrop>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
  );
}

export default TableTileSubmitted;