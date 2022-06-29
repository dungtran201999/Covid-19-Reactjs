import React from 'react';
import {Grid} from '@material-ui/core';
import HighLightCard from './HighLightCard';
// import { useSelector } from 'react-redux';



export default function HightLight({report}) {
    const data=(report && report.length>0)?report[report.length-1]:[];
    // const report1= useSelector(state=>state.report.current) 
    // console.log(report1,'report1')
    console.log('hightLight',data);
    const Summary=[
          {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed',
          },
          {
            title: 'Số ca khỏi',
            count: data.Recovered,
            type: 'recovered',
          },
          {
            title: 'Số ca tử vong',
            count: data.Deaths,
            type: 'death',
          },
    ]
    return (
        <div style={{marginTop: 30 }}>
            <Grid container spacing={3}>
                {
                    Summary.map((item)=>(
                        <Grid item sm={4} xs={12}>
                            <HighLightCard 
                                title={item.title}
                                count={item.count}
                                type={item.type} 
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}
