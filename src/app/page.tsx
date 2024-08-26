"use client"
import { Footer, Header, RecipesList } from "@/app/components"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  width: 100%;
  @media (max-width: 480px) {
    padding: 4rem 1rem;
  }
`

const Title = styled.h2`
  text-align: center;
`

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <Title>Trending Recipes</Title>
        <RecipesList />
      </Main>
      <Footer />
    </>
  )
}
