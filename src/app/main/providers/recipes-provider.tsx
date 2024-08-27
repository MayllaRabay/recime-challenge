"use client"
import { RecipeModel } from "@/app/domain/models"
import { makeLocalStorageAdapter } from "@/app/main/cache"
import { RecipesContext } from "@/app/main/contexts"
import { makeRemoteGetRecipes } from "@/app/main/usecases"
import { useContext, useLayoutEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export function RecipesProvider({ children }: Props) {
  const [recipes, setRecipes] = useState<Array<RecipeModel>>([])
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const getRecipes = makeRemoteGetRecipes()
  const localStorage = makeLocalStorageAdapter()

  const handleGetRecipes = async () => {
    setIsLoading(true)
    if (localStorage.contains("Recipes")) {
      const recipesList = localStorage.get("Recipes")
      setRecipes(recipesList)
      setIsLoading(false)
    } else {
      try {
        const responseRecipes = await getRecipes.get()
        const orderedRecipeList = responseRecipes.sort((a: any, b: any) => {
          return a.position - b.position
        })
        localStorage.set("Recipes", orderedRecipeList)
        setRecipes(orderedRecipeList)
      } catch (error: any) {
        setError(true)
        console.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useLayoutEffect(() => {
    handleGetRecipes()
  }, [])

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, error, isLoading }}>
      {children}
    </RecipesContext.Provider>
  )
}

export function useRecipesContext() {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error("useRecipesContext must be used within a RecipesProvider")
  }
  return context
}
