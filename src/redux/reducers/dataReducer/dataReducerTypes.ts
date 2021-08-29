import {
    GET_DATA_REQUESTED,
    GET_DATA_SUCCEDED,
    GET_DATA_FAILED,
    SET_MAPPED_CURRENCY,
    TOGGLE_ACTIVE_CURRENCY,
    GET_COUNTRIES_SUCCEDED,
} from './dataReducer';


type RequestDataActionType = {
    type: typeof GET_DATA_REQUESTED
};

type MappedCurrencyType = {
    name: string,
    rate: number,
    flags?: string[],
    isActive: boolean
};

type RequestDataSuccessPayloadType = {
    symbols?: Record<string, string>,
    rates?: Record<string, number>,
};

type RequestDataSuccessActionType = {
    type: typeof GET_DATA_SUCCEDED,
    payload: RequestDataSuccessPayloadType
};

type RequestCountriesSuccess = {
    type: typeof GET_COUNTRIES_SUCCEDED,
    payload: Record<string, string>,
}

type RequestDataFailedActionType = {
    type: typeof GET_DATA_FAILED,
    payload: string | null
};

type SetMappedCurrencyType = {
    type: typeof SET_MAPPED_CURRENCY,
    payload: MappedCurrencyType[]
};

type ToggleActiveCurrencyType = {
    type: typeof TOGGLE_ACTIVE_CURRENCY,
    payload: string
};  

type ActionsTypes = RequestDataActionType | RequestDataSuccessActionType | RequestDataFailedActionType
    | SetMappedCurrencyType | RequestCountriesSuccess | ToggleActiveCurrencyType;

type InitialStateType = {
    currency: {
        symbols?: Record<string, string>,
        rates?: Record<string, number>,
        countries?: Record<string, string>,
        mapped?: MappedCurrencyType[]
    },
    isFetching: boolean,
    error: null | string
};

export type {
    RequestDataActionType,
    RequestDataSuccessPayloadType,
    RequestDataSuccessActionType,
    RequestCountriesSuccess,
    RequestDataFailedActionType,
    SetMappedCurrencyType,
    MappedCurrencyType,
    ToggleActiveCurrencyType,
    ActionsTypes,
    InitialStateType
};