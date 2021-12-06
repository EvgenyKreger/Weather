
import axios from 'axios';
import {Cities} from '../../models/Cities';
import {createAsyncThunk} from '@reduxjs/toolkit';




// export const fetchCities = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(citySlice.actions.citiesFetching())
//         const response = await axios.get<Cities[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(citySlice.actions.citiesFetchingSuccess(response.data))
//     } catch (e) {
//         dispatch(citySlice.actions.citiesFetchingError('ERROR 100500'))
//     }
// }


export const fetchCities = createAsyncThunk(

    'city/fetchAll',
    async (value:string, thunkAPI) =>{
        try {
            const response = await axios.get<Cities[]>(`http://htmlweb.ru/geo/api.php?json&city_name=${value}&api_key=c0ce976f81633aafb700594fe97582e6`)
            return response.data
        } catch (e){
            return thunkAPI.rejectWithValue('Сорян братан, что-то пошло нетак')
        }

    }
)
export const fetchWeatherCities = createAsyncThunk(
    'city/fetch',
    async (newName:any, thunkAPI) =>{
        try {
            const response = await axios.get<Cities[]>(`https://api.openweathermap.org/data/2.5/weather?q=${newName.name},${newName.country}&appid=634d06f1747beb716b919ed5b586d4d0`)
            return response.data;
        } catch (e){
            return thunkAPI.rejectWithValue('Сервис "Оpenweather" не может найти город, введите название другого города')
        }

    }
)

export const fetchUpdateCity = createAsyncThunk(
    'city/fetchUpdate',
    async (item:any, thunkAPI) =>{
        try {
            const response = await axios.get<Cities[]>(`https://api.openweathermap.org/data/2.5/weather?id=${item.id}&appid=634d06f1747beb716b919ed5b586d4d0`)
            return response.data;
        } catch (e){
            return thunkAPI.rejectWithValue('Сервис "Оpenweather" не может найти город, введите название другого города')
        }

    }
)
