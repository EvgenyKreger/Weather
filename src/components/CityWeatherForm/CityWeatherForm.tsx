import {Button} from '@mui/material';
import React, {FC} from 'react';
import {useAppSelector} from '../../myHooks/redux';
import style from './CityWeatherForm.module.css'


export interface cityWeatherForm {
    id: number
    index: number
    name: string
    temp: number
    time: string
    humidity: number
    pressure: number
    wind: number
    deg: number
    img: string
    updateCity: (id: number) => void
    deleteSelectedCity: (id: number) => void
}

const CityWeatherForm: FC<cityWeatherForm> = (props) => {
    const {disable} = useAppSelector(state => state.cityReducer)
    let degrees = props.deg;
    const directions = ['🡻', '🡿', '🡸', '🡼', '🡹', '🡽', '🡺', '🡾'];
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees);
    degrees = (degrees + 8) % 8
    const result = directions[degrees]
    return (
        <div className={style.city}>
            <h3>Город: {props.name} </h3>
            <p>Температура: {Math.round(props.temp - 273)}℃ <img
                src={`https://openweathermap.org/img/w/${props.img}.png`} alt="icon"/></p>
            <p>Влажность: {props.humidity}%</p>
            <p>Атмосферное давление: {props.pressure}</p>
            <p>Сила и направление ветра: {props.wind} м/с <span style={{color: '#d32f2f'}}>{result}</span></p>
            <p>Последнее обновление данных: {props.time}  </p>
            <Button size="small" variant="contained" color="error" disabled={disable}
                    onClick={() => props.deleteSelectedCity(props.id)}>Удалить</Button> <span> </span>
            <Button size="small" variant="contained" color="success" disabled={disable}
                    onClick={() => props.updateCity(props.id)}>Обновить</Button>
        </div>
    );
}

export default React.memo(CityWeatherForm);
