import styled, { css } from "styled-components";


const ContainerMessageLi = styled.li<{ user: boolean }>`
  display: flex;
  align-items: ${p => p.user ? 'flex-start' : 'flex-end'};
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: .5rem;
`

const TextMessage = styled.span<{ user: boolean }>`
  color: ${p => p.theme.text.default}; 
  ${p => {
    switch (p.user) {
      case true:
        return css`
        background-color: ${p => p.theme.bg.chat.secondary};
        border-radius: 8px 8px 8px 0px;

        `
      default:
        return css`
        background-color: ${p => p.theme.bg.chat.primary};
        border-radius: 8px 8px 0px 8px;
        
        `

    }
  }}
  padding: 1.4rem;
  font-size: 1.35rem;
  word-break: break-word;
  `
const AuthorMessage = styled.span`
  color: ${p => p.theme.text.default};  
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 1.5rem;
 
 `

export { ContainerMessageLi, TextMessage, AuthorMessage }