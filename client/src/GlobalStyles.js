import { createGlobalStyle } from 'styled-components';

export const COLORS = {
   
  primary: "#845EC2",
  yoga : '#D65DB1',
  accessory: '#FF6F91',
  meditation: '#FF9671',  
  lightGray: '#E6E0E0',
  primaryLight: '#e6dff3',
  primaryDark: '#6a41ac',
  yogaLight: '#f5d7ec',
  yogaDark: '#cc349d',
  accessoryLight: '#ffd6df',
  accessoryDark: '#ff3c6a',
  meditationLight: '#ffe2d8',
  meditationDark: '#ff703e', 
};

export const HEADER_HEIGHT = '74px';


const GlobalStyles = createGlobalStyle`
html,
body,
div,
span,
h1 {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: 'Montserrat', sans-serif;
}
`;

export default GlobalStyles;