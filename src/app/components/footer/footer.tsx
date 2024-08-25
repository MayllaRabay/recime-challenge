import styled from "styled-components"

const Wrapper = styled.footer`
  background-color: #fcaa52;
  text-align: center;
  margin-top: auto;
  padding: 0.5rem;
  width: 100vw;
`

const Text = styled.p`
  color: white;
  font-size: 0.875rem;
`

export function Footer() {
  return (
    <Wrapper>
      <Text>Made with 🧡 by Maylla Rabay</Text>
    </Wrapper>
  )
}
