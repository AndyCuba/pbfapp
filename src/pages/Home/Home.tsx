import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CurrencyList from '../../components/CurrencyList/CurrencyList';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import { Main } from '../../components/Main/Main';
import { useAppSelector } from '../../hooks/redux.hooks';
import { fetchData, setMappedCurrency } from '../../redux/reducers/dataReducer/dataReducer';
import { MappedCurrencyType } from '../../redux/reducers/dataReducer/dataReducerTypes';
import { 
    countriesSelector, 
    mappedCurrencySelector, 
    ratesSelector, 
    symbolsSelector 
} from '../../redux/reducers/dataReducer/dataSelectors';
import { HomeWrapper, MainCurrencyWrapper } from './style';

function Home() {
    const dispatch = useDispatch();
    const symbols = useAppSelector(symbolsSelector);
    const rates = useAppSelector(ratesSelector);
    const countries = useAppSelector(countriesSelector);
    const currencies = useAppSelector(mappedCurrencySelector);
    const activeCurrency = currencies?.filter(currency => currency.isActive === true)[0];
    const symbolsUrl = 'http://data.fixer.io/api/symbols?access_key=0e13e40f815f26797b6d484700c3d5be';
    const ratesUrl = 'http://data.fixer.io/api/latest?access_key=0e13e40f815f26797b6d484700c3d5be&format=1';
    const countriesUrl = 'http://country.io/currency.json';
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
    
    //Finds corresponding flags and returns Array with flags' urls
    const findCountryCurrencyFlags = useCallback((obj: typeof countries, value: string) => {
        if(obj) {
            const keys = Object.keys(obj);
            const flags = keys.filter(flag => obj[flag] === value);
            return flags.map(flag => {
                const createdFlag = `https://flagcdn.com/w160/${flag.toLowerCase()}.png`;

                //Loads all the necessary images
                fetch(createdFlag);

                return createdFlag;
            });
        }
    }, []);

    //Sends requests if store doesnt contain currency's props
    useEffect(() => {
        if(!symbols) {
            fetchData(dispatch, symbolsUrl);
        };

        if(!rates) {
            fetchData(dispatch, ratesUrl);
        };

        if(!countries) {
            fetchData(dispatch, proxyUrl + countriesUrl);
        };

    }, [dispatch, symbols, rates, countries]);

    //Sets mappedCurrency array when currencies' props are loaded 
    useEffect(() => {
        if(symbols && rates && countries) {
            const mappedCurrency: MappedCurrencyType[] = [];

            for(let symbol in symbols) {
                mappedCurrency.push({ 
                    name: symbols[symbol], 
                    rate: rates[symbol],
                    flags: findCountryCurrencyFlags(countries, symbol),
                    isActive: false
                }); 
            }

            dispatch(setMappedCurrency(mappedCurrency));
        }
    }, [symbols, rates, countries, dispatch, findCountryCurrencyFlags]);

    return (
      <HomeWrapper >
            <Header/>
                <MainCurrencyWrapper>
                {
                    currencies ? 
                        <>
                            <CurrencyList activeCurrency={activeCurrency}/>
                            <Main activeCurrency={activeCurrency}/>
                        </> :
                        <Loader />        
                } 
            </MainCurrencyWrapper>
      </HomeWrapper>
    );
  }
  
  export default Home;