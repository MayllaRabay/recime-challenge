import { RemoteGetRecipes } from "@/app/data/usecases"
import { GetRecipes } from "@/app/domain/usecases"

export const makeRemoteGetRecipes = (): GetRecipes => {
  return new RemoteGetRecipes()
}
