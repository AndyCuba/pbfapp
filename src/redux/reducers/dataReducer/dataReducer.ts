import { AppDispatch } from '../../store';
import {
    RequestDataActionType,
    RequestDataSuccessPayloadType,
    RequestDataSuccessActionType,
    RequestCountriesSuccess,
    RequestDataFailedActionType,
    SetMappedCurrencyType,
    ToggleActiveCurrencyType,
    ActionsTypes,
    InitialStateType,
    MappedCurrencyType,
} from './dataReducerTypes';

const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
const GET_DATA_SUCCEDED = 'GET_DATA_SUCCEDED';
const GET_COUNTRIES_SUCCEDED = 'GET_COUNTRIES_SUCCEDED';
const GET_DATA_FAILED = 'GET_DATA_FAILED';
const SET_MAPPED_CURRENCY = 'SET_MAPPED_CURRENCY';
const TOGGLE_ACTIVE_CURRENCY = 'TOGGLE_ACTIVE_CURRENCY';

const requestData = (): RequestDataActionType  => ({
    type: GET_DATA_REQUESTED,
});

const requestDataSuccess = (data: RequestDataSuccessPayloadType): RequestDataSuccessActionType  => ({
    type: GET_DATA_SUCCEDED,
    payload: data
});

const requestCountriesSuccess = (data: Record<string, string>): RequestCountriesSuccess => ({
    type: GET_COUNTRIES_SUCCEDED,
    payload: data
});

const requestDataFailed = (error: string): RequestDataFailedActionType  => ({
    type: GET_DATA_FAILED,
    payload: error
});

const setMappedCurrency = (mapped: MappedCurrencyType[]): SetMappedCurrencyType => ({
    type: SET_MAPPED_CURRENCY,
    payload: mapped
});

const toggleActiveCurrency = (name: string): ToggleActiveCurrencyType => ({
    type: TOGGLE_ACTIVE_CURRENCY,
    payload: name
});

const fetchData = async (dispatch: AppDispatch, url: string) => {
    dispatch(requestData());
    try {
        return fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.symbols || data.rates) {
                return dispatch(requestDataSuccess(data));
            } else {
                return dispatch(requestCountriesSuccess(data))
            };
        });
    } catch(error: any) {
        dispatch(requestDataFailed(error.message));
    };   
};

//State
const initialState: InitialStateType = {
    currency: {},
    isFetching: false,
    error: null
}

// Reducer
const dataReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case GET_DATA_REQUESTED:
            return { 
                ...state,
                isFetching: true 
            };
        case GET_DATA_SUCCEDED:
            if(action.payload.rates) {
                return {
                    ...state,
                    isFetching: false,
                    currency: { 
                        ...state.currency,
                        rates: action.payload.rates 
                    }
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                    currency: { 
                        ...state.currency,
                        symbols: action.payload.symbols 
                    }
                };
            };
        case GET_COUNTRIES_SUCCEDED:
            return {
                ...state,
                isFetching: false,
                currency: { 
                    ...state.currency,
                    countries: action.payload
                } 
            };
        case GET_DATA_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
         case SET_MAPPED_CURRENCY:
                return {
                    ...state,
                    currency: { 
                        ...state.currency,
                        mapped: action.payload
                    }
                };
        case TOGGLE_ACTIVE_CURRENCY:
                return {
                    ...state,
                    currency: { 
                        ...state.currency,
                        mapped: state.currency.mapped?.map(currency => {
                            if(currency.name === action.payload) {
                                currency.isActive = !currency.isActive;
                            }
                            return currency;
                        })
                    }
                };    
        default:
            return state;
    };
};

export {
    GET_DATA_REQUESTED,
    GET_DATA_SUCCEDED,
    GET_COUNTRIES_SUCCEDED,
    GET_DATA_FAILED,
    SET_MAPPED_CURRENCY,
    TOGGLE_ACTIVE_CURRENCY,
    requestData,
    requestDataSuccess,
    requestDataFailed,
    setMappedCurrency,
    toggleActiveCurrency,
    fetchData,
    dataReducer
};