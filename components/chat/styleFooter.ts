import styled from 'styled-components'

const FormContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 2rem;
    background-color: inherit;
`

const ChatForm = styled.form`
   position: relative;
`

const ChatInput = styled.input`
  width: 100%;
  background-color: ${props => props.theme.bg.variant};
  color: ${props => props.theme.text.default};
  border: none;
  outline: none;
  height: 5.2rem;
  border-radius: 999px;
  line-height: 1.4rem;
  padding: 1rem 2rem;
  font-size: 1.35rem;
  &::placeholder {
    color: ${props => props.theme.text.default};
  }
`
const SubmitButton = styled.button`
  position: absolute;
  right: 1.65rem;
  top: 50%;
  transform: translateY(-40%);
  background: none;
  border: none;
  font-size: 2.8rem;
  color: ${props => props.theme.text.default};
  cursor: pointer;
`

export {
	FormContainer,
	ChatForm,
	ChatInput,
	SubmitButton
}