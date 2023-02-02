import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-size: 62.5%;
}
body {
  font-size: 1.6rem;
}
  * {
    margin: 0;
    padding: 0;
	  box-sizing: border-box;
    scrollbar-width: auto;
    scrollbar-color: #633bbc #d4d4d4;
  }

  *::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }

  *::-webkit-scrollbar-track {
    background: #d4d4d4;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #633bbc;
    border-radius: 0px;
    border: 3px solid #633bbc;
  }
`;

export default GlobalStyle;