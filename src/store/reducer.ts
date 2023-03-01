import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
} from './constants';

import { WeatherAction, Forecast, City, CityName } from './actions';
export interface WeatherState {
    loading: boolean;
    city: CityName | null;
    forecast: Forecast[];
    error: string
}

const initialState: WeatherState = {
    loading: false,
    city: null,
    forecast: [],
    error: ''
};

const reducer = (state: WeatherState = initialState, action: WeatherAction): WeatherState => {
    switch (action.type) {
        case FETCH_WEATHER_REQUEST:
            return { ...state, loading: true };
        case FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                city: action.payload.currentWeather,
                forecast: action.payload.weatherForecast
            };
        case FETCH_WEATHER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
export default reducer;



