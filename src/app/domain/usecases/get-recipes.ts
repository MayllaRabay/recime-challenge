import { RecipeModel } from "@/app/domain/models"

export interface GetRecipes {
  get(): Promise<GetRecipes.Response>
}

export namespace GetRecipes {
  export type Response = Array<RecipeModel>
}
