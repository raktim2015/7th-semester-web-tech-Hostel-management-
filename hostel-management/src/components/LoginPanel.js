import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tabs,Tab,Typography,Box,Card,TextField,Button,FormControl,Radio, RadioGroup,
        FormControlLabel, Snackbar
        } from '@material-ui/core';
import {Link,Redirect} from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    alignContent: 'center',
    marginTop: '30vh',
  },
  card: {
    minWidth: 275,
    align: 'center',
    maxWidth: 400
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formclass:{
    
    '& > *': {
        margin: 'auto',
        width: '100%'
      }
  },
  TextFieldClass:{
      marginTop:10,
      marginBottom:5
  },
  SubmitClass:{
      marginTop:40,
      marginBottom:10,
      width:'40%',
      float:'right'
  }

}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const LoginPanel = () => {
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0)
  const [userValue, setUserValue] = React.useState('student')
  const [snackBar,setSnackBarValue] = React.useState(false)
  const [snackBar2,setSnackBarValue2] = React.useState(false)
  const [redirectTo,setRedirectValue] = React.useState('/')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRadioChange = (event) => {
    setUserValue(event.target.value);
  }
  const handleSnackBarOpen = (event) => {
    setSnackBarValue(true)
  }
  const handleSnackBarClose = (event) => {
    setSnackBarValue(false)
  }
  const handleSnackBarSuccessOpen = (event) => {
    setSnackBarValue2(true)
  }
  const handleSnackBarClose2 = (event) => {
    setSnackBarValue2(false)
  }

  const handleRedirectStudent = (event) => {
    setRedirectValue('/student')
  }
  
  const handleRedirectAdmin = (event) => {
    setRedirectValue('/admin')
  }


  const submitLoginDetails = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value    
    const user_type = userValue
    const permissionLevel = (user_type === 'admin')?0:1
    const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.length===0 || password.length===0 || !email_regex.test(email)) {
      handleSnackBarOpen()
      return
    }
    else {
      axios.post('http://127.0.0.1:3001/login',
        {
          email: email, 
          password: password,
          permissionLevel: permissionLevel
        })
      .then(resp => {
        if(user_type === 'student')
          handleRedirectStudent()
        else if(user_type === 'admin')
          handleRedirectAdmin()
      })
      .catch(err => {
        handleSnackBarOpen()
      });
    }
    
  }

  const submitSignupDetails = () => {
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value    
    const user_type = userValue
    const permissionLevel = 1
    const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.length===0 || password.length===0 || !email_regex.test(email)) {
      handleSnackBarOpen()
      return
    }
    else {
      axios.post('http://127.0.0.1:3001/users',
        {
          email: email, 
          password: password,
          permissionLevel: permissionLevel
        })
      .then(resp => {
        console.log(resp)
        handleSnackBarSuccessOpen()
      })
      .catch(err => {
        console.log(err)
        handleSnackBarOpen()
      });
    }
    
  }

  
  if(redirectTo === '/') {
  return (
    <div className={classes.root}>
        <Card className={classes.card} style={{margin:'auto'}}>
            <Tabs value={value} onChange={handleChange} centered aria-label="simple tabs example">
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign up" {...a11yProps(1)} />
            </Tabs>
        
            <TabPanel value={value} index={0}>
                <form className={classes.formclass} noValidate autoComplete="off">    
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="user" name="user1" value={userValue} onChange={handleRadioChange} id="user">
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                    </RadioGroup>
                  </FormControl>
                  <TextField className={classes.TextFieldClass} required id="email" label="Email Id." variant="outlined"/>
                  <TextField className={classes.TextFieldClass} required id="password" label="Password" variant="outlined" type = "password"/>
                  <Button className={classes.SubmitClass} variant='outlined' color='primary' onClick={() => submitLoginDetails()} >Login</Button>
                </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <form className={classes.formclass} noValidate autoComplete="off">    
                  <Typography color="textSecondary" > * signup only allowed for students </Typography>
                  <TextField className={classes.TextFieldClass} required id="signup-email" label="Email Id." variant="outlined"/>
                  <TextField className={classes.TextFieldClass} required id="signup-password" label="Password" variant="outlined" type = "password"/>
                  <Button className={classes.SubmitClass} variant='outlined' color='primary' onClick={() => submitSignupDetails()} >Sign up</Button>
                </form>
            </TabPanel>
        
        </Card>
        <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="error">
            Error in email or password
          </Alert>
        </Snackbar>
        <Snackbar open={snackBar2} autoHideDuration={4000} onClose={handleSnackBarClose2}>
          <Alert onClose={handleSnackBarClose2} severity="success">
            Account Successfully created
          </Alert>
        </Snackbar>
    </div>  
  );
  }
  else if(redirectTo === '/student') {
    return(
      <Redirect to = {redirectTo} />
    )
  }
  else if(redirectTo === '/admin') {
    return(
      <Redirect to = {redirectTo} />
    )
  }
}
export default LoginPanel;