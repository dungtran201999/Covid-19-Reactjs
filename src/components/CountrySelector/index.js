import React from 'react';
import {FormControl, InputLabel , NativeSelect , FormHelperText} from '@material-ui/core';

export default function CountrySelector({value,handleOnchange,countries}) {
    
    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="country-selector" shrink>Quốc gia</InputLabel>
                <NativeSelect 
                    value={value}
                    onChange={handleOnchange}
                    inputProps={{
                        name:'country',
                        id:'country-selector'
                    }}
                >
                    {
                        countries.map((res)=>{
                        return <option key={res.ISO2} value={res.ISO2.toLowerCase()}>{res.Country}</option>
                        })
                    }
                    
                </NativeSelect>
                <FormHelperText>Lựa chọn quốc gia</FormHelperText>
            </FormControl>
        </div>
    );
}
