import React, { useEffect,useState } from 'react';
import {Grid} from '@material-ui/core';
import LineChart from '../Chart/LineChart';
import HightMap from '../Chart/HightMap';

export default function Summary({report,selectedCountryId}) {
    const [mapData,setMapData]=useState({})
    useEffect(()=>{
        if(selectedCountryId){
           const mapData= import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`).then((res)=>setMapData(res))
        }
    },[selectedCountryId])
    return (
        <div  style={{ height: '500px', marginTop: 30 }}>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report}/>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HightMap mapData={mapData}/>
                </Grid>
            </Grid>
        </div>
    );
}
