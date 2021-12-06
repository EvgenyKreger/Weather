import {Button} from '@mui/material';
import React, {FC} from 'react';
import {useAppDispatch} from '../hooks/redux';
import {citySlice} from '../store/reducers/CitySlice';
import {fetchUpdateCity} from '../store/reducers/ActionCreators';

export interface cityWeatherForm {
    id: number
    index: number
    name: string
    temp: number
    time: string
    humidity: number
    pressure: number
    wind: number
    img: string
}

export const CityWeatherForm: FC<cityWeatherForm> = (props) => {
    const dispatch = useAppDispatch()


    return (
        <div className="city">
            <h3>Город: {props.name} </h3>
            <p>Температура: {Math.round(props.temp - 273)}℃ <img
                src={`https://openweathermap.org/img/w/${props.img}.png`} alt="icon"/></p>
            <p>Влажность: {props.humidity}%</p>
            <p>Атмосферное давление: {props.pressure}</p>
            <p>Сила и направление ветра: {props.wind} м/с -&#8595;</p>
            <p>Последнее обновление данных: {props.time}  </p>
            <Button size="small" variant="contained" color="error"
                    onClick={() => dispatch(citySlice.actions.deleteCity(props.id))}>Удалить</Button>
            <Button size="small" variant="contained" color="success" onClick={() => dispatch(fetchUpdateCity(props.id))}>Обновить</Button>

        </div>
    );
}