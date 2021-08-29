import styled from 'styled-components';
import { mainColor } from '../../style';

const HeaderWrapper = styled.header`
    background: ${mainColor};
    text-align: right;
    border-bottom: 1px solid #546e7a;
    h1 {
        color: white;
        padding: 5px 10px;
    }
`;

export {
    HeaderWrapper
};