import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import LoginPanel from './../components/LoginPanel';
import logo from './../images/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    pageRight: {
        display:'flex',
        height: '100vh',
    },
    logo: {
        
        alignSelf:'center',
        display:'flex',
        width:'50%'
    },
    pageLeftLogoContainer: {
        backgroundImage:'linear-gradient(to top left, #085078, #85D8CE)',
        height:'100%',
        alignItems:'center', 
        display:'flex',
        justifyContent:'center'
        
    }

}));


function LandingPage() {
    const classes = useStyles();
    return (
        <div className = {classes.root}>
            <Grid container spacing={0} >
                <Grid item xs={12} sm={5} md={5} className = {classes.pageLeft}>
                    <Grid item className = {classes.pageLeftLogoContainer} > 
                        <img src = {logo} className = {classes.logo}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7} md={7} className = {classes.pageRight}>
                    <LoginPanel />
                </Grid>
            </Grid>
        </div>
    );
}

export default LandingPage;

