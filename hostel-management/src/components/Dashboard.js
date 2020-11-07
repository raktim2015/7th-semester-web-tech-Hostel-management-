import React from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {Grid, Card, CardContent, Box} from '@material-ui/core';
import {ResponsiveContainer, PieChart, Pie, Chart, Cell, Legend, ComposedChart, CartesianGrid,XAxis,YAxis,Tooltip,Area,Bar,Line} from 'recharts'
import LinearProgress from '@material-ui/core/LinearProgress';
import {useQuery} from 'react-query';
import {useAuth} from './../context/auth';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#DC143C'];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
      },
    colorPrimary: {
        color: 'green',
      },
      barColorPrimary: {
        color: 'red',
      }
}));


const LinearProgressWithLabel = (props) => {
    const classes = useStyles();
    
    return (
      <Box display="flex" alignItems="center" style={{height:50}}>
        <Box width="100%" mr={2}>
          <LinearProgress variant="determinate" value={props.value} className={classes.colorPrimary} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" style={{color: props.barColor}} >{`${Math.round(
            props.valueToDisplay,
)}`} {props.text}</Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
  
  
const ProfileData = (props) => {

   
    const normalize = (MAX,curr) => {
        return (curr-0)*100 / MAX
    }

    const data = []
    
    
    //store data for display
    Object.keys(props.status).forEach((obj) => {
        data.push({name:obj, value:props.status[obj]})
    })

    //normalize
    let total = 0;
    Object.keys(props.status).forEach((obj) => {total += props.status[obj]})


    return (
        <Card style={{height:400}} variant="outlined"> 
            <CardContent>
                <Typography variant = "h6" center>
                    Profile Data
                </Typography>
                {data.map((obj,index) => (
                    <LinearProgressWithLabel value={normalize(total,obj.value)} valueToDisplay={obj.value} barColor={COLORS[index]} text={obj.name}/>
                ))}
            </CardContent>
        </Card>   
    )
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    const percentval = (percent * 100).toFixed(0)
    return (percentval > 0) ? (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
    </text>
    ):(<span></span>)
};

const ProfilePie = (props) => {

    /*const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];*/
    
    
    const data = []
    
    Object.keys(props.status).forEach((obj) => {
        data.push({name:obj, value:props.status[obj]})
    })
    
    return(
        <Card variant="outlined"  style={{height:400}}>
            <CardContent>
                <Typography variant = "h6" center>
                    Profile Statistics
                </Typography>
                
                <div style={{height:300}}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie 
                                data={data}
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                label={renderCustomizedLabel}
                            >
                                {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                            </Pie>
                            <Legend
                                payload={
                                    data.map(
                                    (item,index) => ({
                                        id: item.name,
                                        type: "circle",
                                        value: `${item.name}`,
                                        color: COLORS[index]
                                    })
                                    )
                                }
                            />    
                        </PieChart>           
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

const SalaryDistanceChart = (props) => {

    const labels = ["Below 50k","50k - 1L","1L - 1.5L","1.5L - 2L","2L - 2.5L","2.5L - 5L","Above 5L"]
    const slabs = labels.map((obj) => 0)
    props.data.forEach((obj) => {
        if(obj.income!==undefined && obj.submittedStatus>=2) {
            if(obj.income <= 0.5) slabs[0]++;
            else if(obj.income <= 1) slabs[1]++;
            else if(obj.income <= 1.5) slabs[2]++;
            else if(obj.income <= 2) slabs[3]++;
            else if(obj.income <= 2.5) slabs[4]++;
            else if(obj.income <= 5) slabs[5]++;
            else if(obj.income > 5) slabs[6]++;
        }
    })
    const data = []
    slabs.forEach((elem,index) => {
        data.push({"name":labels[index], "students":elem})
    })



    
    return(
        <div style={{height:300}}>
            <ResponsiveContainer>
                <ComposedChart height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Bar dataKey="students" barSize={20} fill="#413ea0" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );

}

const Dashboard = () => {
    const authkey = useAuth().authTokens
    const options = {
      headers: {'authorization': authkey}
    };

    const {isLoading, error, data} = useQuery('getAllUsers',() => (
        axios('http://127.0.0.1:3001/allUsers',options)
    ))
    if(!isLoading) {
        const status = {"Registered":0, "Submitted":0, "Verified":0, "Accepted":0, "Rejected":0}
        data.data.forEach((obj) => {
            if(obj.permissionLevel === 1) {
                switch(obj.submittedStatus) {
                    case 1: status['Registered']++; 
                            break;
                    case 2: status['Submitted']++; 
                            break;
                    case 3: status['Verified']++; 
                            break;
                    case 4: status['Accepted']++; 
                            break;
                    case 5: status['Rejected']++; 
                            break;
                }
            }
        })    
        return (
            <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} sm={5} style={{marginTop:20,marginBottom:20}}>
                            <ProfilePie data={data.data} status={status} />
                        </Grid>
                        <Grid item xs={12} sm={5} style={{marginTop:20,marginBottom:20}}>
                            <ProfileData data={data.data} status={status} />
                        </Grid>
                        <Grid item xs={12} sm={10} style={{marginTop:20,marginBottom:20}}>
                            <SalaryDistanceChart data={data.data} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    else {
        return (<p> Loading </p>);
    }
    
}

export default Dashboard;