import styled, { createGlobalStyle } from 'styled-components';

const mainColor = '#64b5e8';
const additionalColor = '#ffd875';
// const additionalColor = '#f8fc7c';
// '#1e88e5'
// '#f9a825'
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Hind Madurai', sans-serif;
  }
`;

const AppWrapper = styled.div`
  max-width: 1024px;
  margin: auto;
`;

export {
    GlobalStyle,
    AppWrapper,
    mainColor,
    additionalColor
};