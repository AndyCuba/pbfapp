import styled from 'styled-components';
import { additionalColor, mainColor } from '../../style';

type ListProps = {
    isOpened: boolean
};

type ListItemProps = {
    isActive: boolean
};

const CurrencyListWrapper = styled.div`
    width: 250px;
`;

const SelectWrapper = styled.div`
    position: relative;
    button {
        width: 150px;
        height: 40px;
        cursor: pointer;
        background-color: ${additionalColor};
        border-radius: 10px;
        position: absolute;
        left: 5%;
        top: -45px;
        border: 1px solid black;
        transition: all 0.05s;
        font-weight: 500;
        font-size: 15px;
        &:active {
            transform: scale(0.95);
        }
    }   
`;

const List = styled.ul<ListProps>`
    width: 250px;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    border-left: 1px solid black;
    &::-webkit-scrollbar-track {
        box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.5) inset; 
    }
    &::-webkit-scrollbar-thumb {
        background: ${additionalColor};
        box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.3) inset;
    }
    &::-webkit-scrollbar {
        width: 10px;
        background: ${mainColor};
    }
    opacity: ${props => props.isOpened ? '1' : '0'};
    height: ${props => props.isOpened ? '585px' : '0px'};
`;

const ListItem = styled.li<ListItemProps>`
    padding-left: 5px;
    cursor: pointer;
    list-style: none;
    border-bottom: 1px solid black;
    background-color: ${props => props.isActive ? mainColor : 'none'};
    color: ${props => props.isActive ? '#FFF' : 'black'};
    &:hover {
        background-color: ${mainColor};
        color: #FFF;
    }
`;

export {
    CurrencyListWrapper,
    SelectWrapper,
    List,
    ListItem
};