import styled from "styled-components";

const HeaderContainer = styled.header`
 	background-color: ${props => props.theme.bg.default};
 	height: 8rem;
    display: grid;
    grid-template-columns: 1fr 4.8rem;
    align-items: center;
`

const SearchForm = styled.form`
   position: relative;
   width: 100%;
   background-color: inherit;
   display: flex;
   justify-content: center;
`

const SearchInput = styled.input`
  background-color: ${props => props.theme.bg.variant};
  color: ${props => props.theme.text.default};
  border: none;
  outline: none;
  height: 3.8rem;
  width: 85%;
  border-radius: .5rem;
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

const ImageContainer = styled.div`
	width: 48px;
	height: 48px;
	position: relative;
	& img {
		border-radius: 50%;
	}
`

export {
	HeaderContainer,
	SearchForm,
	SearchInput,
	SubmitButton,
	ImageContainer
}