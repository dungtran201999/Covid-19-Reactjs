import countryReducer from '../redux/countrySlice'
import reportReducer from '../redux/reportSlice'
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer={
    country:countryReducer,
    report:reportReducer,
}

const store=configureStore({
    reducer:rootReducer,
})
export default store;