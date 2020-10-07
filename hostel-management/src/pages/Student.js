import React from 'react';
import {Grid,AppBar,Toolbar,Typography,Button, Stepper,Step,StepButton, TextField, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StatusCard from '../components/StatusCard'; 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    profileContainer: {
        display:'flex',
        paddingTop:'10vh',
        alignItems:'center',
        justifyContent:'center',
        alignContent: 'center'
    },
    infoContainer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        alignContent: 'center'
    },
    TextFieldClass:{
        marginTop:10,
        marginBottom:5,
        paddingLeft:5,
        paddingRight:5,
        display:'flex'
    },
    hostelStatus:{
        marginTop:50,
        marginBottom:50,
        display:'flex',
        justifyContent:'center',
        
    }
}));

const getSteps = () => {
    return ['Basic Information','Profile Details','Upload Documents','Submit Information']
}
const getStepContents = (step) => {
    switch(step) {
        case 0:
            return 'Step 1: Basic information'
        case 1:
            return 'Step 2: Profile details'
        case 2:
            return 'Step 3: Upload documents'
        case 3:
            return 'Step 4: Submit Information'
        default:
            return 'Unknown step'
    }
}


const countryCodes = [
    {
        value:'91',
        label:'(+91) India'
    },
    {
        value:'10',
        label:'(+10) Germany'
    },
    {
        value:'11',
        label:'(+11) UK'
    },
    {
        value:'12',
        label:'(+12) France'
    },
    {
        value:'19',
        label: '(+19) Sweden'
    }

];

const departments = [
    {
        label:'Information Technology',
        value:'IT'
    },
    {
        label:'Mechanical Engineering',
        value:'ME'
    },
    {
        label:'Electronics and Telecommunication',
        value:'ETC'
    },
    {
        label:'Computer Science and Technology',
        value:'CST'
    }

];

const Student = () => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [completed, setCompleted] = React.useState(new Set())
    const [skipped, setSkipped] = React.useState(new Set())
    const [countryCode1,setCountryCode1] = React.useState('91')
    const [countryCode2,setCountryCode2] = React.useState('91')
    
    const steps = getSteps();

    const totalSteps = () => {
        return getSteps().length;
    };

    const handleCountryCode1 = (event) => {
        setCountryCode1(event.target.value)
    };
    const handleCountryCode2 = (event) => {
        setCountryCode2(event.target.value)
    };
    

    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
        isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            steps.findIndex((step, i) => !completed.has(i))
            : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== totalSteps()) {
        handleNext();
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set());
        setSkipped(new Set());
    };

    function isStepComplete(step) {
        return completed.has(step);
    }
    return (
        <Grid container  spacing={0} style={{paddingBottom:'10vh'}}>
            <Grid item xs={12} sm={12} md={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Hostel Management System
                        </Typography>
                        <Button color="inherit">Welcome Raktim</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.hostelStatus}>
                <StatusCard />
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.profileContainer}>
                <Grid item xs={12} sm={6} md={6}>
                    <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => {
                        const stepProps = {};
                        const buttonProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                            <StepButton
                                onClick={handleStep(index)}
                                completed={isStepComplete(index)}
                                {...buttonProps}
                            >
                                {label}
                            </StepButton>
                            </Step>
                        );
                        })}
                    </Stepper>
                    {(activeStep===0)?(
                        
                        <Grid container spacing={0} className={classes.infoContainer}>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="fname" label="First Name" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5} >
                            <TextField className={classes.TextFieldClass} required id="lname" label="Last Name" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="email" label="Email" variant="outlined" value="raktimmalakar2015@gmail.com" disabled/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5} >
                            <TextField className={classes.TextFieldClass} id="altEmail" label="Alternate Email" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <Grid container spacing={0}>
                                <Grid item xs={5} md={5} sm={5} >
                                    <TextField select required className={classes.TextFieldClass} value={countryCode1} onChange={handleCountryCode1} id="code1" label="Code" variant="outlined">
                                        {countryCodes.map((option)=>(
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={7} md={7} sm={7} >
                                    <TextField required className={classes.TextFieldClass} id="phno1" label="Phone no." variant="outlined"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <Grid container spacing={0}>
                                <Grid item xs={5} md={5} sm={5} >
                                    <TextField select className={classes.TextFieldClass} value={countryCode2} onChange={handleCountryCode2} id="code2" label="Code" variant="outlined">
                                        {countryCodes.map((option)=>(
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={7} md={7} sm={7} >
                                    <TextField className={classes.TextFieldClass} id="phno2" label="Alternate phone no." variant="outlined"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="country" label="Country" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="state" label="State" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12} md={10} sm={10}>
                            <TextField className={classes.TextFieldClass} required id="address1" label="Address Line 1" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12} md={10} sm={10}>
                            <TextField className={classes.TextFieldClass} required id="address2" label="Address Line 2" variant="outlined"/>
                        </Grid>
                        <Grid item sm={3} xs={5} md={3}>
                            <Button
                                style={{display:'flex',alignContent:'flex-end'}}
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.TextFieldClass}
                            >
                            Next
                            </Button>
                        </Grid>
                        <Grid item sm={3} xs={5} md={3}>
                            <Button
                                style={{display:'flex',alignContent:'flex-end'}}
                                variant="contained"
                                color="primary"
                                onClick={handleComplete}
                                className={classes.TextFieldClass}
                            >
                            Save
                            </Button>
                        </Grid>
                    </Grid>):
                    ((activeStep===1)?
                    (
                        <Grid container spacing={0} className={classes.infoContainer}>
                            <Grid item sm={12} xs={5} md={5}>
                                <TextField className={classes.TextFieldClass} required id="enrollId" label="Enrollment Id" variant="outlined"/>
                            </Grid>
                            <Grid item sm={12} xs={5} md={5}>
                                <TextField select className={classes.TextFieldClass} required id="dept" label="Department" variant="outlined" >
                                    {departments.map((option)=>(
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item sm={3} xs={5} md={3}>
                                <Button
                                    style={{display:'flex',alignContent:'flex-end'}}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.TextFieldClass}
                                >
                                Next
                                </Button>
                            </Grid>
                            <Grid item sm={3} xs={5} md={3}>
                                <Button
                                    style={{display:'flex',alignContent:'flex-end'}}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleComplete}
                                    className={classes.TextFieldClass}
                                >
                                Save
                                </Button>
                            </Grid>
                        </Grid>
                        
                    ):
                    ((activeStep==2)?(
                        <Grid item>Upload Documents</Grid>):(<Grid item >Submit Docuements</Grid>)
                    ))}
                    
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Student;

