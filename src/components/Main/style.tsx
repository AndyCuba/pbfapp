import styled from 'styled-components';

type FlagPropType = {
    background: string;
};

const MainWrapper = styled.div`
    height: 565px;
    width: 100%;
    padding: 30px 60px;
    h2, h3 {
        padding-bottom: 20px;
    }
`;

const FlagWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40px, 60px));
    grid-gap: 10px;
    justify-items: center;
    margin-bottom: 20px;
`;

const Flag = styled.div<FlagPropType>`
    width: 40px;
    height: 20px;
    box-shadow: 0px 0px 7px 2px rgba(34, 60, 80, 0.2);
    background: url(${props => props.background}) center/cover;
    transition: transform 0.5s;
    &:hover {
        transform: scale(1.2);
    }
`;

export {
    MainWrapper,
    FlagWrapper,
    Flag
};