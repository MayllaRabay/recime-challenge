import { RecipeModel } from "@/app/domain/models"
import { createContext, Dispatch, SetStateAction } from "react"

type RecipesContext = {
  recipes: Array<RecipeModel>
  setRecipes: Dispatch<SetStateAction<Array<RecipeModel>>>
  error: boolean
  isLoading: boolean
}

export const RecipesContext = createContext<RecipesContext | null>(null)
