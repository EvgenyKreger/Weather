import React, {useCallback, useEffect} from 'react';
import './App.css';
import CityWeatherForm from './components/CityWeatherForm/CityWeatherForm'
import InputComplete from './components/InputComplete/InputComplete';
import {useAppDispatch, useAppSelector} from './myHooks/redux';
import {fetchCities, fetchUpdateCity, fetchWeatherCities} from './store/reducers/ActionCreators';
import {citySlice} from './store/reducers/CitySlice';
import {Alert, LinearProgress,} from '@mui/material';


function App() {

    const dispatch = useAppDispatch();
    const {value, error, isLoading, listCities, selectValue} = useAppSelector(state => state.cityReducer)

    useEffect(() => {
        const data = localStorage.getItem('cities');
        if (data) {
            dispatch(citySlice.actions.setLocalStorage(JSON.parse(data)))
        }
    }, [dispatch])  //LocalStorage getItem
    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(selectValue));
    }, [selectValue])  //LocalStorage setItem


    useEffect(() => {
        if (value.length > 2 && value.length < 20) {
            dispatch(fetchCities(value))
        }
    }, [value, dispatch])


    useEffect(() => {
        const needName = Object.values(listCities).filter(el => el.full_name === value);
        const newName = {...needName[0]}
        if (newName.full_name) {
            dispatch(fetchWeatherCities(newName))
            dispatch(citySlice.actions.russianName(newName.name))
        }
    }, [value, dispatch, listCities])


    const updateCity = useCallback((id: number) => {
        const needIndex = selectValue.findIndex(el => el.id === id);
        const item = selectValue[needIndex]
        dispatch(fetchUpdateCity(item))
    }, [dispatch, selectValue])

    const updateAllCity = useCallback(() => {
        for (let i = 0; i < selectValue.length; i++) {
            dispatch(fetchUpdateCity(selectValue[i]))
        }
    }, [dispatch, selectValue])

    const deleteSelectedCity = useCallback((id: number) => {
        dispatch(citySlice.actions.deleteCity(id))
    }, [dispatch])

    return (
        <div className={'App'}>
            <div className={'header'}>
                {isLoading && <LinearProgress color="success"/>}
                {error && <h1><Alert variant="filled" severity="error">
                    Сервис не может найти город, пожалуйста введите название другого города!
                </Alert></h1>}
                <InputComplete updateAllCity={updateAllCity}/>
            </div>
            <div className={'city-block'}>
                {selectValue.map((el, index) => <CityWeatherForm key={el.id} id={el.id} index={index}
                                                                 name={el.nameRu} time={el.time}
                                                                 temp={el.main.temp} humidity={el.main.humidity}
                                                                 pressure={el.main.pressure} wind={el.wind.speed}
                                                                 deg={el.wind.deg}
                                                                 img={el.weather[0].icon} updateCity={updateCity}
                                                                 deleteSelectedCity={deleteSelectedCity}
                />)}
            </div>
        </div>

    );
}


export default React.memo(App);

