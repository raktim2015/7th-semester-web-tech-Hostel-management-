import React from 'react';
import {Grid,Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    container:{
        display:'flex',
        justifyContent:'center'
    },
    root:{
        display:'flex',
        backgroundColor:'#ffffff',
        color:'#000000',
        minHeight:500,
        overflow:'scroll'

    },

}));
const DetailsInfo = (props) => {

    const classes = useStyles();
    return (
       <Grid container spacing={0} className={classes.container}>
           
            <Grid item xs={6} sm={6} md={6} className={classes.root}>
                {props.information.fname}<br/>{props.information.lname}
            </Grid>
           
       </Grid>
       
    );
}

export default DetailsInfo