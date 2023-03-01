import React, { useEffect, useState } from 'react'
import './css/style.css'

interface CityName {
    temp: number;
    temp_min: number;
    temp_max: number;
}

interface City {
    main: CityName;
}

interface Forecast {
    dt_txt: string;
    main: CityName;
    weather: {
        description: string; // textual description of the weather condition
        icon: string; // weather icon code
    }[];

}


const Weather = () => {
    const [city, set_city] = useState<CityName | null>(null);
    const [search, set_search] = useState<string>("mumbai");
    const [forecast, set_forecast] = useState<Forecast[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2ba94decc3e9ac5589ba135c56023c0a`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=2ba94decc3e9ac5589ba135c56023c0a`;

            const [weatherResponse, forecastResponse] = await Promise.all([fetch(weatherUrl), fetch(forecastUrl)]);
            const weatherData: City = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            const currentWeather: CityName = weatherData.main;
            const weatherForecast: Forecast[] = forecastData?.list?.filter((data: Forecast) => data.dt_txt.includes("12:00:00"));

            set_city(currentWeather);
            set_forecast(weatherForecast);
        }
        fetchApi();
    }, [search])

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
                {!city ? (
                    <p>No Data Found</p>
                ) : (
                    <>
                        <div>
                            <div className='info'>
                                <h2 className='location'>
                                    <i className="fa-solid fa-street-view"></i>{search}
                                </h2>
                                <h1 className='temp'>
                                    {city.temp}°C
                                </h1>
                                <h3 className='temp_min_max'>Min : {city.temp_min}°C | Max : {city.temp_max}°C</h3>
                            </div >
                        </div>
                        <div className='main'>
                            <h2>Weather Forecast</h2>
                            <div className="forecast">
                                {forecast.map((data: Forecast) => (
                                    <div className="forecast-item" key={data.dt_txt}>
                                        <h3 className="date">{data.dt_txt.slice(0, 10)}</h3>
                                        <h4 className="temp">{data.main.temp}°C</h4>
                                        <h5 className="temp_min_max">Min : {data.main.temp_min}°C | Max : {data.main.temp_max}°5</h5>
                                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" />
                                        <p>{data.weather[0].description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

            </div >

        </>
    )
}

export default Weather;