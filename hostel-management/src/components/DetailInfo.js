import React from 'react';
import {Grid,Paper,TextField, Typography, Link, Button} from '@material-ui/core';
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
    infoContainer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        alignContent: 'center',
        backgroundColor:'#ffffff',
        
    },
    TextFieldClass:{
        marginTop:10,
        marginBottom:5,
        paddingLeft:5,
        paddingRight:5,
        display:'flex'
    }

}));
const DetailsInfo = (props) => {

    /*
        props.information
        
        address1: "Kanpur"

address2: "Uttar Pradesh"
​​

​​

​
country: "India"
​
​
distance: 1453
​​
​​

​
​​
income: 0.6
​​

​


​​
state: "Uttar Pradesh"

    */
    const classes = useStyles();
    console.log(props);
    return (
       <Grid container spacing={0} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Grid item xs={12} sm={6} md={6} >
                <Grid container spacing={0} className={classes.infoContainer}>
                    <Grid item xs={12} style={{paddingTop:10,paddingBottom:20, paddingLeft:20, color:'#000000'}}>
                        <Typography variant="h6">
                            Profile Information
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="fname" variant="outlined" label="First name" value={props.information.fname || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="lname" variant="outlined" label="Last name" value={props.information.lname || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="enrollId" variant="outlined" label="Enrollment Id" value={props.information.enrollId || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="dept" variant="outlined" label="Department" value={props.information.dept || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="email1" variant="outlined" label="Primary Email" value={props.information.email || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="email2" variant="outlined" label="Alternate Email" value = {props.information.altEmail || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="phno1" variant="outlined" label="Primary Contact" value = {`${(props.information.code1 + " " + props.information.phno1)}`} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="phno2" variant="outlined" label="Alternate Contact" value = {`${(props.information.code2 + " " + props.information.phno2)}`} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="country" variant="outlined" label="Country" value={props.information.country || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="state" variant="outlined" label="State" value = {props.information.state || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="distance" variant="outlined" label="Distance (in km)" value={props.information.distance || ''} readonly />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField className={classes.TextFieldClass}  id="income" variant="outlined" label="Income (in lakhs)" value = {props.information.income || ''} readonly />
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" color="primary"
                            onClick={() => {
                                window.open("http://localhost:3001/static/"+props.information.idDocName)
                            }}
                            >
                            View ID 
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" color="primary"
                            onClick={() => {
                                window.open("http://localhost:3001/static/"+props.information.incomeDocName)
                            }}
                            >
                            View Income Certificate
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
           
       </Grid>
       
    );
}

export default DetailsInfo;