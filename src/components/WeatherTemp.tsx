import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './css/style.css'

import { CityName, City, Forecast, WeatherAction, fetchWeather } from '../store/actions'
import { WeatherState } from '../store/reducer'
import { AnyAction, Dispatch } from 'redux';


const WeatherTemp = () => {
    const dispatch = useDispatch<any>();
    const { loading, city, forecast, error } = useSelector((state: WeatherState) => state);
    const [search, set_search] = useState<string>('Mumbai');
    useEffect(() => {
        dispatch(fetchWeather(search));
    }, [dispatch, search]);


    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input
                        type="search"
                        className="inputField"
                        value={search}
                        onChange={(e) => set_search(e.target.value)}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : search === '' ? (
                    <div className="empty-search">
                        <p>Please Enter Location in above TextFiled</p>
                        <a href="/">Go Back</a>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className='info'>
                                <h2 className='location'>
                                    <i className="fa-solid fa-street-view"></i>{search}
                                </h2>
                                <h1 className='temp'>
                                    {city?.temp}°C
                                </h1>
                                <h3 className='temp_min_max'>Min : {city?.temp_min}°C | Max : {city?.temp_max}°C</h3>
                            </div >
                        </div>
                        <div className='main'>
                            <h2>Weather Forecast</h2>
                            <div className="forecast">
                                {forecast.map((data: Forecast) => (
                                    <div className="forecast-item" key={data?.dt_txt}>
                                        <h3 className="date">{data?.dt_txt.slice(0, 10)}</h3>
                                        <h4 className="temp">{data?.main?.temp}°C</h4>
                                        <h5 className="temp_min_max">Min : {data.main.temp_min}°C | Max : {data.main.temp_max}°5</h5>
                                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" />
                                        <p>{data.weather[0].description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )

}

export default WeatherTemp;