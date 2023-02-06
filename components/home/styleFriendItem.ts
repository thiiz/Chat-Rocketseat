import styled from "styled-components";


const FriendsLi = styled.li`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: .5rem;
  border-bottom: 1px solid #35334a;
  &:hover{
		border: none;
	}
  `

const Container = styled.button`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	height: 100%;
	padding: 1rem 0;
	width: 100%;
	cursor: pointer;
	background: none;
	border: none;
	transition: 250ms ease;
	border-radius: 4px;
	padding-left: 1rem;
	&:hover{
		background-color: ${props => props.theme.hover.list};
	}
`

const ImageContainer = styled.div`
	width: 4.3rem;
	height: 4.3rem;
	position: relative;

	& img{
		border-radius: 50%;
	}
`
const NameAndLastMessageContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: .3rem;
align-items: flex-start;
`

const Name = styled.span`
	color: ${props => props.theme.text.default};
	font-weight: 700;
	font-size: 1.6rem;
`
const LastMessage = styled.span`
color: ${props => props.theme.text.placeholder};
font-size: 1.3rem;
`
export {
	FriendsLi,
	Container,
	ImageContainer,
	NameAndLastMessageContainer,
	LastMessage,
	Name,
}