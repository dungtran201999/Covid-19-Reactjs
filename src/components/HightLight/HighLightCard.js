import React from 'react';
import { CardContent, Typography, Card, makeStyles } from '@material-ui/core';
// import CountUp from 'react-countup';


const useStyles = makeStyles({
    wrapper: (props) => {
      console.log({ props });
      if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c' };
      if (props.type === 'recovered') return { borderLeft: '5px solid #28a745' };
      else return { borderLeft: '5px solid gray' };
    },
    title: { fontSize: 18, marginBottom: 5 },
    count: { fontWeight: 'bold', fontSize: 18 },
  });


export default function HighLightCard({type,title,count}) {
    const classes = useStyles({ type });
    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" className={classes.title}>{title}</Typography>
                <Typography component="span" variant="body2"  className={classes.count}>
                    {/* <CountUp start={0} end={count?count:0} duration={1} separator=" "></CountUp>  */}
                    <div>{count?count:0}</div> 
                    
                </Typography>
            </CardContent>
        </Card>
    );
}
