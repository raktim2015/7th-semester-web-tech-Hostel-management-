import React from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {Grid, Card, CardContent, Box} from '@material-ui/core';
import {ResponsiveContainer, PieChart, Pie, Cell, Legend, 
        ComposedChart, CartesianGrid,XAxis,YAxis,Tooltip, 
        Bar, RadialBar, RadialBarChart} from 'recharts'

import { 
    ComposableMap, Geographies, Geography 
  } from 'react-simple-maps';

import LinearProgress from '@material-ui/core/LinearProgress';
import {useQuery} from 'react-query';
import {useAuth} from './../context/auth';
import LinearGradient from './LinearGradient';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
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
    Object.keys(props.status).forEach((obj,index) => {
        data.push({name:obj, value:props.status[obj],fill:COLORS[index]})
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
                <div style={{height:300}}>
                    <ResponsiveContainer>
                        <RadialBarChart
                            width={500}
                            height={350}
                            innerRadius="10%"
                            outerRadius="80%"
                            data={data}
                        >
                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
                            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
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

const SalaryChart = (props) => {

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
        <Card variant="outlined" style={{height:400}}>
            <CardContent>
                <Typography variant = "h6">
                    Family Income
                </Typography>
                <div style={{height:300, marginTop:20}}>
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
            </CardContent>

        </Card>
        
    );

}

const StateChart = (props) => {

    const INDIA_TOPO_JSON = require('../data/india.topo.json');

    const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
    };

    // Red Variants
    const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
    ];

    const DEFAULT_COLOR = '#EEE';

    const getRandomInt = () => {
    return parseInt(Math.random() * 100);
    };

    const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
    };

    // will generate random heatmap data on every call
    const getHeatMapData = () => {
    return [
        { id: 'AP', state: 'Andhra Pradesh', value: getRandomInt() },
        { id: 'AR', state: 'Arunachal Pradesh', value: getRandomInt() },
        { id: 'AS', state: 'Assam', value: getRandomInt() },
        { id: 'BR', state: 'Bihar', value: getRandomInt() },
        { id: 'CT', state: 'Chhattisgarh', value: getRandomInt() },
        { id: 'GA', state: 'Goa', value: 21 },
        { id: 'GJ', state: 'Gujarat', value: 22 },
        { id: 'HR', state: 'Haryana', value: getRandomInt() },
        { id: 'HP', state: 'Himachal Pradesh', value: 24 },
        { id: 'JH', state: 'Jharkhand', value: 26 },
        { id: 'KA', state: 'Karnataka', value: 27 },
        { id: 'KL', state: 'Kerala', value: getRandomInt() },
        { id: 'MP', state: 'Madhya Pradesh', value: getRandomInt() },
        { id: 'MH', state: 'Maharashtra', value: getRandomInt() },
        { id: 'MN', state: 'Manipur', value: getRandomInt() },
        { id: 'ML', state: 'Meghalaya', value: 59 },
        { id: 'MZ', state: 'Mizoram', value: getRandomInt() },
        { id: 'NL', state: 'Nagaland', value: 59 },
        { id: 'OR', state: 'Odisha', value: 59 },
        { id: 'PB', state: 'Punjab', value: getRandomInt() },
        { id: 'RJ', state: 'Rajasthan', value: getRandomInt() },
        { id: 'SK', state: 'Sikkim', value: getRandomInt() },
        { id: 'TN', state: 'Tamil Nadu', value: getRandomInt() },
        { id: 'TG', state: 'Telangana', value: getRandomInt() },
        { id: 'TR', state: 'Tripura', value: 14 },
        { id: 'UT', state: 'Uttarakhand', value: getRandomInt() },
        { id: 'UP', state: 'Uttar Pradesh', value: 15 },
        { id: 'WB', state: 'West Bengal', value: 17 },
        { id: 'WB', state: 'West Bengal', value: 17 },
        { id: 'AN', state: 'Andaman and Nicobar Islands', value: getRandomInt() },
        { id: 'CH', state: 'Chandigarh', value: getRandomInt() },
        { id: 'DN', state: 'Dadra and Nagar Haveli', value: 19 },
        { id: 'DD', state: 'Daman and Diu', value: 20 },
        { id: 'DL', state: 'Delhi', value: 59 },
        { id: 'JK', state: 'Jammu and Kashmir', value: 25 },
        { id: 'LA', state: 'Ladakh', value: getRandomInt() },
        { id: 'LD', state: 'Lakshadweep', value: getRandomInt() },
        { id: 'PY', state: 'Puducherry', value: getRandomInt() }
    ];
    };

    const [tooltipContent, setTooltipContent] = React.useState('');
    const [data, setData] = React.useState(getHeatMapData());

    const gradientData = {
        fromColor: COLOR_RANGE[0],
        toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
        min: 0,
        max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
    };

    const colorScale = scaleQuantile()
        .domain(data.map(d => d.value))
        .range(COLOR_RANGE);

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
        setTooltipContent(`${geo.properties.name}: ${current.value}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    const onChangeButtonClick = () => {
        setData(getHeatMapData());
    };

    return (
        <Card variant="outlined" style={{height:400}}>
        <CardContent>
            <Typography variant="h6" >State wise students' distribution</Typography>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
                <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={400}
                height={250}
                data-tip=""
                >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                    geographies.map(geo => {
                        const current = data.find(s => s.id === geo.id);
                        return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                            style={geographyStyle}
                            onMouseEnter={onMouseEnter(geo, current)}
                            onMouseLeave={onMouseLeave}
                        />
                        );
                    })
                    }
                </Geographies>
                </ComposableMap>
                <LinearGradient data={gradientData} />
            </CardContent>
        </Card>
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
                        <Grid item xs={12} sm={5} style={{marginTop:20,marginBottom:20}}>
                            <SalaryChart data={data.data} />
                        </Grid>
                        <Grid item xs={12} sm={5} style={{marginTop:20,marginBottom:20}}>
                            <StateChart data={data.data} />
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