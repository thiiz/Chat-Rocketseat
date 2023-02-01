import styled from "styled-components";


const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  background-color: ${props => props.theme.bg.default};
  color: ${props => props.theme.text.default};
  `

export { Title }