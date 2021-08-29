import { useState } from 'react';
import { sortByName } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { toggleActiveCurrency } from '../../redux/reducers/dataReducer/dataReducer';
import { MappedCurrencyType } from '../../redux/reducers/dataReducer/dataReducerTypes';
import { mappedCurrencySelector } from '../../redux/reducers/dataReducer/dataSelectors';
import { CurrencyListWrapper, List, ListItem, SelectWrapper } from './style';

type PropType = {
    activeCurrency: MappedCurrencyType | undefined;
};

const CurrencyList = ({activeCurrency}: PropType) => {
    const dispatch = useAppDispatch();
    const currencies = useAppSelector(mappedCurrencySelector);
    const [isOpened, setIsOpened] = useState(false);

    //Closes/opens currencies List
    const handleClick = () => {
        setIsOpened(!isOpened);
    };

    //Turns off previous active currency and turns on new
    const handleListClick = (e: React.FormEvent<EventTarget>) => {
        const li = e.target as HTMLLIElement;
        if(li.textContent !== null) {
            if(activeCurrency) {
                dispatch(toggleActiveCurrency(activeCurrency.name));
            };
            dispatch(toggleActiveCurrency(li.textContent));
        };
    };

    return(
        <CurrencyListWrapper>
            <SelectWrapper >
                <button onClick={handleClick}>Show currencies</button>
                <List isOpened={isOpened} onClick={handleListClick}>
                    {
                        currencies?.sort(sortByName)
                            .map((currency, index) => 
                            <ListItem isActive={currency.isActive} key={index}>{currency.name}</ListItem>)
                    }
                </List>
            </SelectWrapper>
        </CurrencyListWrapper>
    )
};

export default CurrencyList;