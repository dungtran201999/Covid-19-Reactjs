import { useEffect, useState, useReducer, useRef } from 'react';

import CountrySelector from "./components/CountrySelector";
import HightLight from "./components/HightLight";
import Summary from "./components/Summary";
import { getReportByCountry } from './apis';
import {sortBy} from 'lodash';
import { Container, Button } from '@material-ui/core';
import {Typography} from '@material-ui/core';
import '@fontsource/roboto';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCountry,setSelectedCountryId} from './redux/countrySlice'
import { fetchReport } from './redux/reportSlice';
const path = require('path')
const getColors = require('get-image-colors')
moment.locale('vi');

// const App = () => {

//   const [count, setCount] = useState(0);
//   const ref = useRef(null);

//   useEffect(() => {
//     ref.current = count;
//   },[count])
  
//   return (
//     <>
//       <p>Ref: {ref.current}</p>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </>
//   )

// }

// export default App;


function App() {
  const dispatch = useDispatch()
  // const [report,setReport]=useState([])
  const countries= useSelector(state=>state.country.current)
  const selectedCountryId= useSelector(state=>state.country.setSelectedCountryId)
  const reportByCountry= useSelector(state=>state.report.current) 
  console.log(selectedCountryId,'selectedCountryId');

    useEffect(()=>{
        dispatch(fetchCountry())
        

        getColors(path.join(__dirname, 'https://png.pngtree.com/png-clipart/20220110/ourmid/pngtree-vietnamese-new-year-with-watermelon-and-banh-chung-png-image_4276546.png')).then(colors => {
          // `colors` is an array of color objects
          console.log(colors)
        })
    },[])

    const handleOnchange = (e)=>{
      console.log("hihiiii");
      dispatch(setSelectedCountryId(e.target.value))
    }
    useEffect(()=>{
      if(selectedCountryId && countries && countries.length){
        const {Slug}= countries.find(country =>country.ISO2 === selectedCountryId.toUpperCase() )
        // console.log({Slug});
        //call api
        dispatch(fetchReport(Slug))
      }
    },[countries,selectedCountryId])
  return (
    <Container>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19 
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleOnchange={handleOnchange} value={selectedCountryId}/>
      <HightLight report={reportByCountry}/>
      <Summary report={reportByCountry} selectedCountryId={selectedCountryId}/>
    </Container>
  );
}

export default App;
