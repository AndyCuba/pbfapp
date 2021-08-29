import { AppStateType } from '../../store';

const ratesSelector = (state: AppStateType) => state.data.currency.rates;
const symbolsSelector = (state: AppStateType) => state.data.currency.symbols;
const mappedCurrencySelector = (state: AppStateType) => state.data.currency.mapped;
const countriesSelector = (state: AppStateType) => state.data.currency.countries;
const isFetchingSelector = (state: AppStateType) => state.data.isFetching;
const errorSelector = (state: AppStateType) => state.data.error;

export {
    ratesSelector,
    symbolsSelector,
    mappedCurrencySelector,
    countriesSelector,
    isFetchingSelector,
    errorSelector
};