import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  padding: 1.5rem;
  color: ${props => props.theme.text.default};
  margin-bottom: 1rem;
`
const ButtonCancel = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  color: inherit;
  padding-inline: 3.5rem;
  padding-block: .7rem;
  font-family: "Roboto", sans-serif;
  background-color: ${props => props.theme.bg.variant};
  border: none;
  border-radius: 7px;
  &:hover{
    background-color: ${props => props.theme.hover.list}
  }
`

export {
  Container,
  ButtonCancel
}