import React from 'react';
import {Grid,Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    root:{
        backgroundColor:'#ffffff',
        color:'black'
    },

}));
const DetailsInfo = (props) => {

    const classes = useStyles();
    return (
       <Grid container className={classes.root}>
           <Grid item xs={12} sm={6} md={6} >
               {props.information.fname} &emsp; {props.information.lname}
           </Grid>
       </Grid>
       
    );
}

export default DetailsInfo