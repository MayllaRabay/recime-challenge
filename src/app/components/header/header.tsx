import styled from "styled-components"

const Wrapper = styled.header`
  background-color: var(--color-orange-XL);
  box-shadow: 0 10px 15px rgba(182, 107, 22, 0.2),
    0 20px 30px rgba(182, 107, 22, 0.2);
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 1rem 2rem;
  width: 100vw;
`

const Logo = styled.img`
  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
  }
`

const Title = styled.h1`
  color: var(--primary-color);
`

export function Header() {
  return (
    <Wrapper>
      <Logo src="/mitten-64px.png" alt="Recipes Logo" />
      <Title>Recipes</Title>
    </Wrapper>
  )
}
