import { AnyAction, Dispatch } from 'redux';
import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
} from './constants';

export interface CityName {
    temp: number;
    temp_min: number;
    temp_max: number;
}
export interface City {
    main: CityName;
}

export interface Forecast {
    dt_txt: string;
    main: CityName;
    weather: {
        description: string; // textual description of the weather condition
        icon: string; // weather icon code
    }[];
}

export interface WeatherAction {
    type: string;
    payload?: any;
}

export const fetchWeather = (search: string) => {
    return async (dispatch: Dispatch<WeatherAction>) => {
        dispatch({ type: FETCH_WEATHER_REQUEST });

        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2ba94decc3e9ac5589ba135c56023c0a`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=2ba94decc3e9ac5589ba135c56023c0a`;

            const [weatherResponse, forecastResponse] = await Promise.all([
                fetch(weatherUrl),
                fetch(forecastUrl),
            ]);
            const weatherData: City = await weatherResponse.json();
            const forecastData: { list: Forecast[] } = await forecastResponse.json();

            console.log("weather --------------", weatherData)
            const currentWeather: CityName = weatherData.main;
            const weatherForecast: Forecast[] = forecastData.list.filter((data: Forecast) =>
                data.dt_txt.includes('12:00:00')
            );

            console.log("------- currentWeather ----------", currentWeather);
            console.log("------- weatherForecast ----------", weatherForecast);

            dispatch({
                type: FETCH_WEATHER_SUCCESS,
                payload: { currentWeather, weatherForecast },
            });
        } catch (error: any) {
            dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
        }
    };
};
