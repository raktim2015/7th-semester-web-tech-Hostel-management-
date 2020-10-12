import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import {Timeline,TimelineConnector,TimelineContent,TimelineDot,TimelineItem,TimelineSeparator,TimelineOppositeContent} from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  timeLineOpposite:{
      flex:0,
      marginLeft:-10
  }
}));

const StatusCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Allotment Status"
        subheader="October 10, 2020"
      />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Current allotment status
        </Typography>
        <Chip label="Submitted" style={{backgroundColor:'lightGreen',marginTop:2,marginBottom:2}}/>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <DeleteIcon />
            <Typography variant="body2" color="textSecondary" component="p">
                &nbsp;Withdraw Application
            </Typography>
        </IconButton>
        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Timeline align="left">
                <TimelineItem>
                    <TimelineOppositeContent className={classes.timeLineOpposite}>
                    </TimelineOppositeContent>
                    <TimelineSeparator >
                        <TimelineDot style={{backgroundColor:'dodgerblue'}}/>
                        <TimelineConnector style={{backgroundColor:'dodgerblue'}}/>
                    </TimelineSeparator>
                    <TimelineContent>
                      Registered
                      <Typography variant="body2" color="textSecondary">
                        You have successfully registered.
                      </Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent className={classes.timeLineOpposite}>
                    </TimelineOppositeContent>
                    <TimelineSeparator >
                        <TimelineDot style={{backgroundColor:'dodgerblue'}} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      Submitted
                      <Typography variant="body2" color="textSecondary" component="p">
                        You have successfully submitted your profile information. Please wait a few days for verification.
                      </Typography>
                    </TimelineContent>
                    
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent className={classes.timeLineOpposite}>
                    </TimelineOppositeContent>
                    <TimelineSeparator >
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      Verified
                      <Typography variant="body2" color="textSecondary" component="p">
                        You profile has been verified.
                      </Typography>
                    </TimelineContent>
                    
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent className={classes.timeLineOpposite}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>Allotted / Rejected</TimelineContent>
                </TimelineItem>
            </Timeline>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default StatusCard;