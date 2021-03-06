import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import TableTileSubmitted from './TableTileSubmitted'
import TableTileVerified from './TableTileVerified'
import TableTileRejected from './TableTileRejected'
import TableTileAccepted from './TableTileAccepted'
import UserData from './../data/userData.json'


/* Create data to pass to table */

const fields = ['Enrollment Id','First Name','Last Name','Details']

function createData(eid, fname, lname, details) {
  return { eid, fname, lname, details };
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminManualAllot = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid container>
    <Grid item xs={12} sm={12}>
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <Tab label="Submitted" {...a11yProps(0)} />
            <Tab label="Verfied" {...a11yProps(1)} />
            <Tab label="Accepted" {...a11yProps(2)} />
            <Tab label="Rejected" {...a11yProps(3)} />
            </Tabs>
        </AppBar>
        
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TableTileSubmitted />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            <TableTileVerified />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <TableTileAccepted />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <TableTileRejected />
            </TabPanel>
        
        </div>
    </Grid>
    </Grid>
  );
}

export default AdminManualAllot;