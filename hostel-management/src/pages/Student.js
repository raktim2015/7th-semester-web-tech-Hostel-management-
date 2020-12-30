import React, { useEffect } from 'react';
import {Grid,AppBar,Toolbar,Typography,Button, Stepper,Step,StepButton, TextField, MenuItem, Checkbox, FormControlLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StatusCard from '../components/StatusCard'; 
import axios from 'axios';
import {useAuth} from './../context/auth'
import CheckIcon from '@material-ui/icons/Check';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';


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
        
    },
    submitChip:{
        backgroundColor:'lightblue',
        borderRadius:10, 
        paddingTop:15, 
        paddingBottom:15, 
        paddingLeft:10,
        paddingRight:10,
        textAlign:'center',
        marginTop:10,
        marginBottom:10
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

const Student = (props) => {
    
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [completed, setCompleted] = React.useState(new Set())
    const [skipped, setSkipped] = React.useState(new Set())
    const [countryCode1,setCountryCode1] = React.useState('91')
    const [countryCode2,setCountryCode2] = React.useState('91')
    const [dept, setDept] = React.useState()
    const [userData, setUserData] = React.useState({})
    const [submitCheck, setsubmitCheck] = React.useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false)
    const authkey = useAuth().authTokens
    const body = userData
    const options = {
        headers: {'authorization': authkey}
        };

    React.useEffect(() => {
        axios.get('http://127.0.0.1:3001/user/', {
            headers:{
                authorization: authkey
            }
        })
        .then((resp) => {
            setUserData(resp.data[0])
            if(resp.data[0].submittedStatus>1) {
                setSubmitButtonDisabled(true)
            }
            else {
                setSubmitButtonDisabled(false)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    },[])
    
    
    const steps = getSteps();
    
    const totalSteps = () => {
        return getSteps().length;
    };

    const handleCountryCode1 = (event) => {
        setCountryCode1(event.target.value)
        setUserData({
            ...userData,
            code1: event.target.value
        })
    };
    const handleCountryCode2 = (event) => {
        setCountryCode2(event.target.value)
        setUserData({
            ...userData,
            code2: event.target.value
        })
    };
    const handleDept = (event) => {
        setDept(event.target.value)
        setUserData({
            ...userData,
            dept: event.target.value
        })
    }

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

    const handleSubmit = () => {
        console.log(userData,"userData")
        if(submitCheck) {
            axios.patch('http://127.0.0.1:3001/user', {submittedStatus:2}, options)
            .then((res)=>console.log(res))
            .catch(() => {})
        }
        else { 
            //error handling snackbar
        }
    }

    const onDataChange = (event, data) => {
        if(event === 'fname') {
            setUserData({
                ...userData,
                fname: document.getElementById('fname').value
            })
        }
        else if(event === 'lname') {
            setUserData({
                ...userData,
                lname: document.getElementById('lname').value
            })
        }
        else if(event === 'altEmail') {
            setUserData({
                ...userData,
                altEmail: document.getElementById('altEmail').value
            })
        }
        else if(event === 'phno1') {
            setUserData({
                ...userData,
                phno1: document.getElementById('phno1').value
            })
        }
        else if(event === 'phno2') {
            setUserData({
                ...userData,
                phno2: document.getElementById('phno2').value
            })
        }
        else if(event === 'country') {
            setUserData({
                ...userData,
                country: document.getElementById('country').value
            })
        }
        else if(event === 'state') {
            setUserData({
                ...userData,
                state: document.getElementById('state').value
            })
        }
        else if(event === 'address1') {
            setUserData({
                ...userData,
                address1: document.getElementById('address1').value
            })
        }
        else if(event === 'address2') {
            setUserData({
                ...userData,
                address2: document.getElementById('address2').value
            })
        }
        else if(event === 'enrollId') {
            setUserData({
                ...userData,
                enrollId: document.getElementById('enrollId').value
            })
        }
        else if(event === 'income') {
            setUserData({
                ...userData,
                income: document.getElementById('income').value
            })
        }
        else if(event === 'distance') {
            setUserData({
                ...userData,
                distance: document.getElementById('distance').value
            })
        }
        else if(event === 'incomeUpload'){
            if(data.length===1){
                setUserData({
                    ...userData,
                    incomeDoc: data[0],
                    incomeDocName: data[0].name
                })
            }
            
        }
        else if(event === 'idUpload'){
            if(data.length===1){
                setUserData({
                    ...userData,
                    idDoc: data[0],
                    idDocName: data[0].name
                })
            }
        }
    }

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
        
        
        console.log(body)

        axios.patch('http://127.0.0.1:3001/user', body, options)
        .then((res)=>console.log(res))
        .catch(() => {})

        if("idDoc" in userData){
            console.log("idDoc Present")
            const data = new FormData() 
            data.append('file', userData.idDoc)
            axios.post("http://127.0.0.1:3001/upload", data, options)
            .then(res => {
                console.log(res.statusText,"ID UPLOAD")
            }).catch((error)=>{console.log(error)})
        }
        if("incomeDoc" in userData){
            const data = new FormData() 
            data.append('file', userData.incomeDoc)
            axios.post("http://127.0.0.1:3001/upload", data, options)
            .then(res => {
                console.log(res.statusText,"INCOME UPLOAD")
            }).catch((error)=>{console.log(error)})
        }

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
                        <Button color="inherit">Welcome</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.hostelStatus}>
                <StatusCard submittedStatus = {userData.submittedStatus} />
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
                            <TextField className={classes.TextFieldClass} required id="fname" variant="outlined" label="First name" value={userData.fname || ''} onChange={() => onDataChange("fname")}/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5} >
                            <TextField className={classes.TextFieldClass} required id="lname" variant="outlined" label="Last name" value={userData.lname || ''} onChange={() => onDataChange("lname")}/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="email"  label="Email Id" variant="outlined" value={userData.email || ''} disabled/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5} >
                            <TextField className={classes.TextFieldClass} id="altEmail" label="Alternate Email" variant="outlined" value={userData.altEmail || ''} onChange={() => onDataChange("altEmail")}/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <Grid container spacing={0}>
                                <Grid item xs={5} md={5} sm={5} >
                                    <TextField select required className={classes.TextFieldClass} value={countryCode1} onChange={handleCountryCode1} value={userData.code1 || ''} id="code1" label="Code" variant="outlined" >
                                        {countryCodes.map((option)=>(
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={7} md={7} sm={7} >
                                    <TextField required className={classes.TextFieldClass} id="phno1" label="Phone no." variant="outlined" value={userData.phno1 || ''} onChange={() => onDataChange("phno1")}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <Grid container spacing={0}>
                                <Grid item xs={5} md={5} sm={5} >
                                    <TextField select className={classes.TextFieldClass} value={countryCode2} onChange={handleCountryCode2} value={userData.code2 || ''} id="code2" label="Code" variant="outlined">
                                        {countryCodes.map((option)=>(
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={7} md={7} sm={7} >
                                    <TextField className={classes.TextFieldClass} id="phno2" label="Alternate phone no." value={userData.phno2 || ''} variant="outlined" onChange={() => onDataChange("phno2")}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="country" label="Country" variant="outlined" value={userData.country || ''} onChange={() => onDataChange("country")}/>
                        </Grid>
                        <Grid item xs={12} md={5} sm={5}>
                            <TextField className={classes.TextFieldClass} required id="state" label="State" variant="outlined" value={userData.state || ''} onChange={() => onDataChange("state")}/>
                        </Grid>
                        <Grid item xs={12} md={10} sm={10}>
                            <TextField className={classes.TextFieldClass} required id="address1" label="Address Line 1" variant="outlined" value={userData.address1 || ''} onChange={() => onDataChange("address1")}/>
                        </Grid>
                        <Grid item xs={12} md={10} sm={10}>
                            <TextField className={classes.TextFieldClass} required id="address2" label="Address Line 2" variant="outlined" value={userData.address2 || ''} onChange={() => onDataChange("address2")}/>
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
                                <TextField className={classes.TextFieldClass} required id="enrollId" label="Enrollment Id" variant="outlined" value={userData.enrollId || ''} onChange={() => onDataChange("enrollId")}/>
                            </Grid>
                            <Grid item sm={12} xs={5} md={5}>
                                <TextField select className={classes.TextFieldClass} required id="dept" label="Department" variant="outlined" value={userData.dept || ''} onChange={handleDept}>
                                    {departments.map((option)=>(
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item sm={12} xs={5} md={5}>
                                <TextField className={classes.TextFieldClass} required id="income" label="Family Income (in lakhs)" variant="outlined" value={userData.income || ''} onChange={() => onDataChange("income")}/>
                            </Grid>
                            <Grid item sm={12} xs={5} md={5}>
                                <TextField className={classes.TextFieldClass} required id="distance" label="Distance from college (in km)" variant="outlined" value={userData.distance || ''} onChange={() => onDataChange("distance")}/>
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
                    ((activeStep==2)?
                    (
                        <Grid container spacing={0} className={classes.infoContainer}>
                            <Grid item xs={12} sm={5} >
                                <Grid container spacing={0}>
                                    <Grid item xs={12} >
                                        <Typography variant="subtitle1">
                                            Upload College ID card
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="label"
                                            size="medium"
                                            startIcon={<PublishOutlinedIcon/>}
                                            >
                                            Upload File
                                            <input
                                                id="idUpload"
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={(event)=>onDataChange("idUpload",event.target.files)}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} sm={5} >
                                <Grid container spacing={0}>
                                    <Grid item xs={12} >
                                        <Typography variant="subtitle1">
                                            Upload family income certificate
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="label"
                                            size="medium"
                                            startIcon={<PublishOutlinedIcon/>}
                                            >
                                            Upload File
                                            <input
                                                id ="incomeUpload"
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={(event)=>onDataChange("incomeUpload",event.target.files)}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={5} >
                                {(userData["idDoc"] === undefined)?(
                                    <Typography variant = "subtitle2" >No File Selected</Typography>
                                ):(
                                    <Typography variant = "subtitle2" >{userData.idDoc.name}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={5} >
                                {(userData["incomeDoc"] === undefined)?(
                                    <Typography variant = "subtitle2" >No File Selected</Typography>
                                ):(
                                    <Typography variant = "subtitle2" >{userData.incomeDoc.name}</Typography>
                                )}
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
                        
                        (
                            <div>
                                <Grid container spacing={0} className={classes.infoContainer}>
                                    <Grid item xs={10} className={classes.submitChip}>
                                        <Typography variant="body2" style={{fontSize:16}}>
                                            Do you want to submit your information? Once submitted, the changes cannot be modified. Please verify your information before making the final submission.
                                        </Typography>
                                        <FormControlLabel
                                            style={{alignSelf:'left'}}
                                            control={
                                            <Checkbox
                                                checked={submitCheck}
                                                onChange={() => setsubmitCheck(!submitCheck)}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="I agree to the above terms and conditions"
                                        />
                                    </Grid>
                                    <Grid item xs={10} style={{textAlign:'right'}} >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CheckIcon />}
                                        onClick = {handleSubmit}
                                        disabled = {submitButtonDisabled}
                                    >
                                    Agree and submit
                                    </Button>
                                    </Grid>
                                    
                                </Grid>
                                
                            </div>
                        )
                    ))}
                    
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Student;

