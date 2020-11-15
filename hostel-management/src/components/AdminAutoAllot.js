import React from 'react';
import {Grid, Card, CardContent, Typography,TextField, Button, Slider} from '@material-ui/core';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {useAuth} from './../context/auth';
import axios from 'axios';
import TableTileVerified from './TableTileVerified';


const useStyles = makeStyles((theme) => ({

    TextFieldClass:{
        marginTop:10,
        marginBottom:5,
        paddingLeft:5,
        paddingRight:5,
        display:'flex'
    }

}));

const PrettoSlider = withStyles({
    root: {
      
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);



const AdminAutoAllot = (props) => {

    const classes = useStyles();
    const [incomeSlider, setIncomeSlider] = React.useState(0.5)
    const [distanceSlider, setDistanceSlider] = React.useState(0.5);
    const [filterState, setFilterState] = React.useState({
        incomeVal: 0.5,
        distanceVal: 0.5,
        seats: 0

    });
    const authkey = useAuth().authTokens

    const handleDistanceSliderChange = (event,newValue) => {
        setDistanceSlider(newValue);
        console.log(distanceSlider);
    }
    const handleIncomeSliderChange = (event, newvalue) => {
        setIncomeSlider(newvalue);
        console.log(incomeSlider);
    }
    const handleOnClick = (event) => {
        setFilterState({
            incomeVal: incomeSlider,
            distanceVal: distanceSlider,
            seats : document.getElementById('seats').value
        })
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">
                            Filters
                        </Typography>
                        <Typography variant="subtitle" color="primary">
                            Applied only on the verified profiles
                        </Typography>
                        <Grid container spacing={2} style={{marginTop:20,marginBottom:20}}>
                            <Grid item xs={12} sm={3}>
                                <TextField className={classes.TextFieldClass}  variant="outlined" label="No. of seats to be allotted" id="seats" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                Weightage on distance
                                <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0.5} min={0} max={1} step={0.01} id="distancewt" onChange={handleDistanceSliderChange} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                Weightage on Annual Income
                                <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0.5} min={0} max={1} step={0.01} id="incomewt" onChange={handleIncomeSliderChange}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button
                                    style={{display:'flex',alignContent:'flex-end'}}
                                    variant="outlined"
                                    color="primary"
                                    className={classes.TextFieldClass}
                                    onClick={handleOnClick}
                                >
                                    Apply Filters
                                </Button>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                       <TableTileVerified filterState={filterState} /> 
                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    );
}
export default AdminAutoAllot;