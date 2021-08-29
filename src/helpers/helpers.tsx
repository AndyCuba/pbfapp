import { MappedCurrencyType } from '../redux/reducers/dataReducer/dataReducerTypes';

//Sorts by name in alphabetical order
const sortByName = (a: MappedCurrencyType, b: MappedCurrencyType) => {
    const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    if (nameA < nameB){
        return -1;
    }
    if (nameA > nameB){
        return 1;
    }
    return 0;
};

export {
    sortByName
};