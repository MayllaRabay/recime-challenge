import { useState } from "react"
import styled from "styled-components"
import { RecipesDifficulty } from "../recipes-difficulty/recipes-difficulty"

const Wrapper = styled.div`
  padding-top: 2rem;
  height: 100%;
  width: 100vw;
  max-width: 60rem;
`

const RecipesWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
`

const Recipe = styled.div<{ $active?: boolean }>`
  border: 1px solid ${(props) => (props.$active ? "#fcaa52" : "#a8a8b3")};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 12rem;
`

const Image = styled.img`
  border-radius: 11px 11px 0 0;
`

const Name = styled.p<{ $active?: boolean }>`
  color: ${(props) => (props.$active ? "#fcaa52" : "#545454")};
  font-weight: bold;
  padding: 1rem 1rem 0.25rem 1rem;
`

const Difficulty = styled.p`
  color: #a8a8b3;
  padding: 0.25rem 1rem 1rem 1rem;
`

export function RecipesList() {
  const [state, setState] = useState({
    recipeDifficulty: "easy"
  })

  return (
    <Wrapper>
      <RecipesDifficulty state={state} setState={setState} />
      <RecipesWrapper>
        <Recipe>
          <Image
            src=" https://ddg0cip9uom1w.cloudfront.net/code-challenge/burger.jpg"
            alt="A picture of a delicious hamburger on a blue plate."
          />
          <Name>Vegan Burger</Name>
          <Difficulty>Medium</Difficulty>
        </Recipe>
      </RecipesWrapper>
    </Wrapper>
  )
}
