import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import {ButtonGroup,Button} from '@material-ui/core';
import moment from 'moment';

const generateOptions = (data) =>{
    let categories=data.map((item)=>moment(item.Date).format('DD/MM/YYYY'));
    console.log("linechart",data);
    // console.log({catagories});
    return {
        chart: {
          type: 'spline',
          height: 500,
        },
        title: {
          text: 'Tổng ca nhiễm',
        },
        xAxis: {
          categories: categories,
          crosshair: true,
        },
        colors: ['#F3585B','#28a745','#808080'],
        yAxis: {
          min: 0,
          title: {
            text: null,
          },
          labels: {
            align: 'right',
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: 'Tổng Ca nhiễm',
            data: data.map((item) => item.Confirmed),
          },
          {
            name: 'Tổng Ca khỏi',
            data: data.map((item) => item.Recovered),
          },{
            name: 'Tổng Ca tử vong',
            data: data.map((item) => item.Deaths),
          }
        ],
      };
    };

export default function LineChart({data}) {
    const [option,setOption]=useState({})
    const [reportType,setReportType]=useState('all')
    useEffect(()=>{
        let dateButton=data
        switch (reportType) {
            case 'all':
                dateButton=data
                break;
            case '30':
                dateButton=data.slice(data.length - 30)
                break;
            case '7':
                dateButton=data.slice(data.length - 7)
                break;
        
            default:
                dateButton=data
                break;
        }
        setOption(generateOptions(dateButton));
    },[data,reportType])
    return (
       <div>
           <ButtonGroup size='small' style={{ display: 'flex',justifyContent: 'flex-end',}}>
               <Button color={reportType === 'all' ? 'secondary' : ''}  onClick={()=>setReportType('all')}>All</Button>
               <Button color={reportType === '30' ? 'secondary' : ''} onClick={()=>setReportType('30')}>30 ngay</Button>
               <Button color={reportType === '7' ? 'secondary' : ''} onClick={()=>setReportType('7')}>7 ngay</Button>
           </ButtonGroup>
           <HighchartsReact  
                highcharts={Highcharts}
                options={option}
           />
       </div>
    );
}
