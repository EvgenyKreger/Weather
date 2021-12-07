import axios from 'axios';
import {Cities} from '../../models/Cities';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCities = createAsyncThunk(
    'city/fetchAll',
    async (value: string, thunkAPI) => {
        try {
            const response = await axios.get<Cities[]>(`http://htmlweb.ru/geo/api.php?json&city_name=${value}&api_key=c0ce976f81633aafb700594fe97582e6`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка сервера')
        }

    }
)
export const fetchWeatherCities = createAsyncThunk(
    'city/fetch',
    async (newName: any, thunkAPI) => {
        try {
            const response = await axios.get<Cities[]>(`https://api.openweathermap.org/data/2.5/weather?q=${newName.name},${newName.country}&appid=634d06f1747beb716b919ed5b586d4d0`)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Сервис не может найти город, введите название другого города')
        }

    }
)

export const fetchUpdateCity = createAsyncThunk(
    'city/fetchUpdate',
    async (item: any, thunkAPI) => {
        try {
            const response = await axios.get<Cities[]>(`https://api.openweathermap.org/data/2.5/weather?id=${item.id}&appid=634d06f1747beb716b919ed5b586d4d0`)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Сервис не может найти город, введите название другого города')
        }

    }
)
