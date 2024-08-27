import { RecipesDifficulty } from "@/app/components"
import { DifficultyEnum } from "@/app/domain/enums"
import { RecipeModel } from "@/app/domain/models"
import { useRecipesContext } from "@/app/main/providers"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"

const Wrapper = styled.div`
  padding-top: 2rem;
  height: 100%;
  width: 100vw;
  max-width: var(--max-width);
`

const rotate = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`

const Centralized = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  row-gap: 0.5rem;
  height: calc((100vh - 5rem) - 25vh);
  width: 100%;
  img {
    animation: ${rotate} 6s infinite;
  }
`

const RecipesWrapper = styled(motion.div)`
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

const Recipe = styled(motion.div)<{ $active?: boolean }>`
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
    recipeDifficulty: "",
    currentRecipeList: [],
    orderedRecipeList: [],
    easyOrderedRecipeList: [],
    mediumOrderedRecipeList: [],
    hardOrderedRecipeList: []
  })
  const { recipes, error, isLoading } = useRecipesContext()

  const orderRecipes = () => {
    const easyOrderedRecipeList = [
      ...recipes.filter(
        (recipe: RecipeModel) => recipe.difficulty === DifficultyEnum.Easy
      ),
      ...recipes.filter(
        (recipe: RecipeModel) => recipe.difficulty !== DifficultyEnum.Easy
      )
    ]
    const mediumOrderedRecipeList = [
      ...recipes.filter(
        (recipe: RecipeModel) => recipe.difficulty === DifficultyEnum.Medium
      ),
      ...recipes.filter(
        (recipe: RecipeModel) => recipe.difficulty !== DifficultyEnum.Medium
      )
    ]
    const hardOrderedRecipeList = [
      ...recipes.filter(
        (recipe: RecipeModel) => recipe.difficulty === DifficultyEnum.Hard
      ),
      ...recipes.filter(
        (recipe: RecipeModel) => recipe.difficulty !== DifficultyEnum.Hard
      )
    ]

    setState((state: any) => ({
      ...state,
      orderedRecipeList: recipes,
      easyOrderedRecipeList,
      mediumOrderedRecipeList,
      hardOrderedRecipeList
    }))
  }

  useEffect(() => {
    if (!recipes) return
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
    if (!recipes) return
    setState((state: any) => ({ ...state, currentRecipeList: recipes }))
    orderRecipes()
  }, [recipes])

  if (error) {
    return (
      <Centralized>
        <h3>
          {"Uh-oh! We couldn't fetch the delicious burger recipes right now"}
        </h3>
        <p>{"Please check your internet connection and try again later."}</p>
      </Centralized>
    )
  }

  if (isLoading) {
    return (
      <Centralized>
        <img src="/hamburger-64px.png" alt="" />
      </Centralized>
    )
  }

  return (
    <>
      {state.currentRecipeList.length > 0 ? (
        <Wrapper>
          <RecipesDifficulty state={state} setState={setState} />
          <RecipesWrapper
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {state.currentRecipeList.map((recipe: RecipeModel) => {
              return (
                <Recipe
                  key={recipe.index}
                  $active={state.recipeDifficulty === recipe.difficulty}
                  layout
                  transition={{ duration: 0.5 }}
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
            })}
          </RecipesWrapper>
        </Wrapper>
      ) : (
        <Centralized>
          <h3>
            {
              "It looks like there are no burger recipes available at the moment"
            }
          </h3>
          <p>{"Check back later for some tasty inspiration!"}</p>
        </Centralized>
      )}
    </>
  )
}
