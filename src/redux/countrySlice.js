import { getCountries } from '../apis'
import { sortBy } from 'lodash';
const { createSlice ,createAsyncThunk} = require("@reduxjs/toolkit");

const initialState={
    current:[],
    error:'',
    setSelectedCountryId:'vn'
}

export const fetchCountry = createAsyncThunk(
    'country/fetchCountry',
    async () => {
      const country = await getCountries()
      return country.data
    }
  )
  
const countrySlice = createSlice({
    name:'country',
    initialState,
    reducers:{
        setSelectedCountryId(state,action){
            state.setSelectedCountryId=action.payload
        }
    },
    extraReducers:{
        [fetchCountry.fulfilled]:(state,action)=>{
            state.current=sortBy(action.payload,'Country')
            return state
        },
        [fetchCountry.rejected]:(state,action)=>{
            state.error=action.payload.messenger
            return state
        },
    }
})
// export const { fetchCountry }= countrySlice.actions; //name export
const {actions,reducer}=countrySlice;
export const {setSelectedCountryId} =actions;
export default reducer

