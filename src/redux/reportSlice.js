import { getReportByCountry } from "../apis";

const { createSlice,createAsyncThunk } = require("@reduxjs/toolkit");

const initialState={
    current:[],
    loading:false,
    error:''
}
export const fetchReport=createAsyncThunk(
    'report/fetchReport',
    async (param, thunkAPI) => {
        const country = await getReportByCountry(param)
        return country.data
      }
)

const reportSlice= createSlice({
    name:'report',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchReport.pending]:(state,action)=>{
            state.loading=true;
            return state
        },
        [fetchReport.rejected]:(state,action)=>{
            state.error=action.payload.messenger;
            return state
        },
        [fetchReport.fulfilled]:(state,action)=>{
            state.current=action.payload;
            return state
        }
    }
})
const {actions,reducer}=reportSlice;
// export const {reportSlice} =actions;
export default reducer
