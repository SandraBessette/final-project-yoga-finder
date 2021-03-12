import { createGlobalStyle } from 'styled-components';

export const COLORS = {
   
  primary: "#845EC2",
  yoga : '#D65DB1',
  meditation: '#FF6F91',
  accessory: '#FF9671',  
  lightGray: '#E6E0E0'
};


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