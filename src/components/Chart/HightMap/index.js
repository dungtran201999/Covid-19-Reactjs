import React, { useState, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map'
import {cloneDeep} from 'lodash';

HighchartsMap(Highcharts)

const initOption={

    chart: {
       height:'500'
    },

    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },

    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#7A0826'],
        ],
    },

    legend: {
        layout: 'vertical',
        align:'right',
        verticalAlign:'bottom',
        
    },
    series: [{
        mapData:{},
        name:'Dan so',
        joinBy: ['hc-key', 'key'],
       
    }]
}

export default function HightMap({mapData}) {
   const [options,setOption]=useState({})
   const chartRef =useRef(null)
   const [configLoaded,setConfigLoaded]=useState(false)
   useEffect(()=>{
       if(mapData && Object.keys(mapData).length){
        console.log('mapData',mapData);
           const dataFake=mapData.features.map((feature, index) => ({
            key: feature.properties['hc-key'],
            value: index,
          }));
           setOption({
               ...initOption,
               series:[
                   {
                       ...initOption.series[0],
                       mapData:mapData,
                       data:dataFake,
                   }
               ]
           })
           if(!configLoaded) setConfigLoaded(true)
       }
   },[mapData,configLoaded])
   useEffect(()=>{
    if(chartRef && chartRef.current){
        console.log("chartRef.current", chartRef.current.chart.series[0]);
        chartRef.current.chart.series[0].update({
            mapData
        })
    }
   },[mapData])
   if(!configLoaded) return null;
    return (
       <div>
         <HighchartsReact 
            highcharts={Highcharts}
            options={cloneDeep(options)}
            constructorType='mapChart'
            ref={chartRef}
         />
       </div>
    );
}