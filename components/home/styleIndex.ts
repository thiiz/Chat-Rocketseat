import styled from "styled-components";

const Container = styled.div`
	background-color: ${props => props.theme.bg.default};
   	font-family: "Roboto", sans-serif;
   	padding: 0 2.4rem;
	display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    min-height: 100vh;
   `;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  background-color: ${props => props.theme.bg.default};
  padding: 1.4rem 2.4rem 1rem 2.4rem;
  width: 100%;
  left: 0;
`;
const MyProfileContainer = styled.div`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	margin-bottom: 1rem;
`
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  width: 100%;
`
const ContainerImage = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
 & img {
  border-radius: 50%;
 }
`;

const ContainerUserNameAndUserID = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${props => props.theme.text.default};
`

const UserName = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  cursor: pointer;
`

const UserID = styled.button`
  font-size: 1rem;
  border: none;
  background: none;
  color: inherit;
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${props => props.theme.text.default};
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`

const LogoutSpan = styled.span`
	font-size: 1rem;
	letter-spacing: 0.18rem;
`

const SearchContainer = styled.div`
    width: 101.5%;
    padding-bottom: 1rem;
    background-color: inherit;
`

const SearchForm = styled.form`
   position: relative;
`

const SearchInput = styled.input`
   width: 100%;
  background-color: ${props => props.theme.bg.variant};
  color: ${props => props.theme.text.default};
  border: none;
  outline: none;
  height: 3.1rem;
  border-radius: 7px;
  line-height: 1.4rem;
  padding: 1rem 2rem;
  font-size: 1.35rem;
  &::placeholder {
    color: ${props => props.theme.text.placeholder};
  }
`
const SubmitButton = styled.button`
  position: absolute;
  right: 1.65rem;
  top: 50%;
  transform: translateY(-40%);
  background: none;
  border: none;
  font-size: 1.8rem;
  color: ${props => props.theme.text.placeholder};
  cursor: pointer;
`

export {
  Container,
  ContainerImage,
  Header,
  MyProfileContainer,
  UserInfoContainer,
  UserName,
  LogoutButton,
  LogoutSpan,
  SearchContainer,
  SearchForm,
  SearchInput,
  SubmitButton,
  ContainerUserNameAndUserID,
  UserID,
}