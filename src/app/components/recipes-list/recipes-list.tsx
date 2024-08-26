import { DifficultyEnum } from "@/app/domain/enums"
import { RecipeModel } from "@/app/domain/models"
import { makeRemoteGetRecipes } from "@/app/main/usecases"
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
    isLoading: false,
    recipeDifficulty: "",
    currentRecipeList: [],
    orderedRecipeList: [],
    easyOrderedRecipeList: [],
    mediumOrderedRecipeList: [],
    hardOrderedRecipeList: []
  })
  const recipes = makeRemoteGetRecipes()

  const getRecipes = async () => {
    setState((state) => ({ ...state, isLoading: true }))
    try {
      const responseRecipes = await recipes.get()

      const orderedRecipeList = responseRecipes.sort((a: any, b: any) => {
        return a.position - b.position
      })
      const easyOrderedRecipeList = [
        ...orderedRecipeList.filter(
          (recipe: RecipeModel) => recipe.difficulty === DifficultyEnum.Easy
        ),
        ...orderedRecipeList.filter(
          (recipe: RecipeModel) => recipe.difficulty !== DifficultyEnum.Easy
        )
      ]
      const mediumOrderedRecipeList = [
        ...orderedRecipeList.filter(
          (recipe: RecipeModel) => recipe.difficulty === DifficultyEnum.Medium
        ),
        ...orderedRecipeList.filter(
          (recipe: RecipeModel) => recipe.difficulty !== DifficultyEnum.Medium
        )
      ]
      const hardOrderedRecipeList = [
        ...orderedRecipeList.filter(
          (recipe: RecipeModel) => recipe.difficulty === DifficultyEnum.Hard
        ),
        ...orderedRecipeList.filter(
          (recipe: RecipeModel) => recipe.difficulty !== DifficultyEnum.Hard
        )
      ]

      setState((state: any) => ({
        ...state,
        currentRecipeList: orderedRecipeList,
        orderedRecipeList,
        easyOrderedRecipeList,
        mediumOrderedRecipeList,
        hardOrderedRecipeList
      }))
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setState((state) => ({ ...state, isLoading: false }))
    }
  }

  useEffect(() => {
    let currentRecipeList
    switch (state.recipeDifficulty) {
      case DifficultyEnum.Easy:
        currentRecipeList = state.easyOrderedRecipeList
        break
      case DifficultyEnum.Medium:
        currentRecipeList = state.mediumOrderedRecipeList
        break
      case DifficultyEnum.Hard:
        currentRecipeList = state.hardOrderedRecipeList
        break
      default:
        currentRecipeList = state.orderedRecipeList
        break
    }
    setState((state: any) => ({ ...state, currentRecipeList }))
  }, [state.recipeDifficulty])

  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <Wrapper>
      <RecipesDifficulty state={state} setState={setState} />
      <RecipesWrapper>
        {state.currentRecipeList.length > 0 ? (
          state.currentRecipeList.map((recipe: RecipeModel) => {
            return (
              <Recipe
                key={recipe.index}
                $active={state.recipeDifficulty === recipe.difficulty}
              >
                <Image
                  src={recipe.imageUrl}
                  alt="A picture of a delicious hamburger on a blue plate."
                />
                <Name
                  title={recipe.name}
                  $active={state.recipeDifficulty === recipe.difficulty}
                >
                  {recipe.name}
                </Name>
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
