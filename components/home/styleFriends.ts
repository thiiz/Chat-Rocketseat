import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	border-bottom: 1px solid #35334a;
	padding: 1rem;
	width: 100%
`

const ImageContainer = styled.div`
	width: 4.7rem;
	height: 4.7rem;
	position: relative;

	& img{
		border-radius: 50%;
	}
`
const NameAndLastMessageContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: .3rem;
`

const Name = styled.span`
color: ${props => props.theme.text.default};
`
const LastMessage = styled.span`
color: ${props => props.theme.text.placeholder};
font-size: 1.3rem;

`
export { Container, ImageContainer, NameAndLastMessageContainer, LastMessage, Name, }
