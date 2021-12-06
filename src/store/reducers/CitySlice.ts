import {Cities, General, Values} from '../../models/Cities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCities, fetchUpdateCity, fetchWeatherCities} from './ActionCreators';
import moment from 'moment';


interface CityState {
    listCities: Cities[],
    value: string,
    isLoading: boolean,
    error: string,
    selectValue: General[],
    general: [],
    check: Values[]
}


const initialState: CityState = {
    listCities: [],
    value: ' ',
    isLoading: false,
    error: '',
    selectValue: [],
    general: [],
    check: []
}

export const citySlice = createSlice({

    name: 'city',
    initialState,
    reducers: {
        inputValue(state, action: PayloadAction<string>) {
            state.value = action.payload
        },
        setLocalStorage(state, action: PayloadAction<[]>) {
            state.selectValue = action.payload
        },
        deleteCity(state, action: PayloadAction<number>) {
         const index = state.selectValue.findIndex((el)=>el.id===action.payload)
            state.selectValue.splice(index,1)


        },
    },
    extraReducers: {
        [fetchCities.fulfilled.type]: (state, action: PayloadAction<[]>) => {
            state.isLoading = false;
            state.error = ''
            state.listCities = action.payload;

        },
        [fetchCities.pending.type]: (state) => {
            state.isLoading = true;
            state.error = '';

        },

        [fetchCities.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }, /////



        [fetchWeatherCities.fulfilled.type]: (state, action: PayloadAction<Values>) => {
            state.isLoading = false;
            state.error = '';
            action.payload.time=moment().format('MM-DD-YYYY HH:mm:ss')
           const filter = state.selectValue.filter((el)=>el.id === action.payload.id)
            if(filter.length === 0){
                state.selectValue.push(action.payload)
            }
        },
        [fetchWeatherCities.pending.type]: (state) => {
            state.isLoading = true;
            state.error = ''
        },
        [fetchWeatherCities.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        /////////////////////////////


        [fetchUpdateCity.fulfilled.type]: (state, action: PayloadAction<Values>) => {
            state.isLoading = false;
            state.error = '';
            action.payload.time=moment().format('MM-DD-YYYY HH:mm:ss')
            const filter = state.selectValue.filter((el)=>el.id === action.payload.id)
            if(filter.length === 0){
                state.selectValue.push(action.payload)
            }
        },
        [fetchUpdateCity.pending.type]: (state) => {
            state.isLoading = true;
            state.error = ''
        },
        [fetchUpdateCity.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})


export default citySlice.reducer;