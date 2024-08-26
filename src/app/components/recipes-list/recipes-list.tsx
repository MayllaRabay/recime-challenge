import { useEffect, useState } from "react"
import styled from "styled-components"
import { RecipesDifficulty } from "../recipes-difficulty/recipes-difficulty"

const Wrapper = styled.div`
  padding-top: 2rem;
  height: 100%;
  width: 100vw;
  max-width: var(--max-width);
`

const RecipesWrapper = styled.div`
  display: grid;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
  grid-template-columns: repeat(auto-fit, max(12rem));
  gap: 1.5rem;
  padding: 0 2rem;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, max(10rem));
    padding: 0 1rem;
  }
`

const Recipe = styled.div<{ $active?: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var( --color-gray-M)"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 12rem;
  @media (max-width: 480px) {
    height: fit-content;
    width: 10rem;
  }
`

const Image = styled.img`
  border-radius: 11px 11px 0 0;
`

const Name = styled.p<{ $active?: boolean }>`
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var( --color-gray-XD)"};
  font-weight: bold;
  padding: 1rem 1rem 0.25rem 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Difficulty = styled.p`
  color: var(--color-gray-M);
  padding: 0.25rem 1rem 1rem 1rem;
`

export function RecipesList() {
  const [state, setState] = useState({
    recipeDifficulty: "easy",
    recipeList: []
  })

  const getRecipes = async () => {
    const { data } = await fetch("/data.json").then((response) =>
      response.json()
    )
    console.log(data)
    setState((old: any) => ({ ...old, recipeList: data }))
  }

  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <Wrapper>
      <RecipesDifficulty state={state} setState={setState} />
      <RecipesWrapper>
        {state.recipeList.length > 0 ? (
          state.recipeList.map((recipe: any) => {
            return (
              <Recipe key={recipe.index}>
                <Image
                  src={recipe.imageUrl}
                  alt="A picture of a delicious hamburger on a blue plate."
                />
                <Name title={recipe.name}>{recipe.name}</Name>
                <Difficulty>{recipe.difficulty}</Difficulty>
              </Recipe>
            )
          })
        ) : (
          <p>There's no recipes at the moment!</p>
        )}
      </RecipesWrapper>
    </Wrapper>
  )
}
