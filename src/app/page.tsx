"use client"
import { Footer, Header, RecipesList } from "@/app/components"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  height: 100%;
  width: 100%;
`

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <h2>Trending Recipes</h2>
        <RecipesList />
      </Main>
      <Footer />
    </>
  )
}
