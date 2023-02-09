import Image from "next/image";
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

const Content = styled.div`
     overflow-y: auto;     
  `
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  background-color: ${props => props.theme.bg.default};
  padding: 2.4rem 2.4rem 1rem 2.4rem;
  width: 100%;
  left: 0;
`;
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`
const ContainerImage = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
 & img {
  border-radius: 50%;
 }
`;

const NameAndStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: .2rem;
`

const UserName = styled.span`
  color: ${props => props.theme.text.default};
  font-weight: 700;
  font-size: 1.6rem;
`

const UserStatus = styled.span`
    color: #00B37E;
    display: flex;
    align-items: baseline;
    font-size: 1.2rem;
    column-gap: .4rem;

  &::before{
    content: '';
    display: block;
    width: .77rem;
    height: .77rem;
    background-color: #00B37E;
    border-radius: 50%;
  }
`
const CloseButton = styled.button`
  display: inline-flex;
  color: ${props => props.theme.text.default};  
  background: none;
  border: none;
  font-size: 2.3rem; 
  cursor: pointer;
`

const ChatContainer = styled.div`
  min-height: 100%;
  padding: 9.5rem 0 ;
  display: grid;
  grid-template-rows: 100% auto;
`

const MessageDate = styled.span`
  color: ${props => props.theme.text.default};  
  align-self: center;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 3.3rem 0;
`

const ContainerUl = styled.ul`
  display: flex;
  flex-direction: column;
  `

export {
  Container,
  Content,
  Header,
  ContainerImage,
  UserInfoContainer,
  NameAndStatusContainer,
  UserName,
  UserStatus,
  CloseButton,
  ChatContainer,
  MessageDate,
  ContainerUl,
}