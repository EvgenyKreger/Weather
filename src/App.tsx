import React, {useEffect} from 'react';
import './App.css';
import {CityWeatherForm} from './components/CityWeatherForm'
import InputComplete from './components/InputComplete';
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {fetchCities, fetchUpdateCity, fetchWeatherCities} from './store/reducers/ActionCreators';
import {citySlice} from './store/reducers/CitySlice';


function App() {

    const dispatch = useAppDispatch();
    const {value, error, isLoading, listCities, selectValue} = useAppSelector(state => state.cityReducer)


    useEffect(() => {
        const data = localStorage.getItem('cities');
        if (data) {
            dispatch(citySlice.actions.setLocalStorage(JSON.parse(data)))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(selectValue));
    },)  //LocalStorage setItem


    useEffect(() => {
        if (value.length > 2 && value.length < 20) {
            dispatch(fetchCities(value))
        }
    }, [value])

    console.log(selectValue)

    useEffect(() => {
        const needName = Object.values(listCities).filter(el => el.full_name === value);
        const newName = {...needName[0]}
        if (newName.full_name) {
            dispatch(fetchWeatherCities(newName))
        }
    }, [value])

    useEffect(() => {

            dispatch(fetchUpdateCity(selectValue))

    }, [])


    return (
        <div className={'App'}>

            {isLoading && <h1>Идет загрузка...</h1>}

            <InputComplete/>
            {error && <h1>{error}</h1>}
            <div className={'city-block'}>
                {selectValue.map((el,index) => <CityWeatherForm key={Math.random()} id={el.id} index={index} name={el.name} time={el.time}
                                                          temp={el.main.temp} humidity={el.main.humidity }
                                                          pressure={el.main.pressure} wind={el.wind.speed}
                                                          img={el.weather[0].icon}
                />)}
            </div>
        </div>

    );
}


export default React.memo(App);

