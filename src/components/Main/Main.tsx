import { MappedCurrencyType } from '../../redux/reducers/dataReducer/dataReducerTypes';
import { Flag, FlagWrapper, MainWrapper } from './style';

type PropType = {
    activeCurrency: MappedCurrencyType | undefined;
};

//Shows currency if there is an active currency
const Main = ({activeCurrency}: PropType) => {   
    if(activeCurrency) {
        return(
            <MainWrapper>
                <h2>{activeCurrency.name}:</h2>
                <h3>{activeCurrency.rate} for 1 EURO</h3>
                <FlagWrapper>
                    {activeCurrency.flags?.map((flag, index) => <Flag key={index} background={flag}/>)}
                </FlagWrapper>
                
            </MainWrapper> 
        );
    } else {
        return(
            <MainWrapper>
                <h2>Please, select currency.</h2>
            </MainWrapper>
        );
    };

};

export {
    Main
};