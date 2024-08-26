import { GetRecipes } from "@/app/domain/usecases"

export class RemoteGetRecipes implements GetRecipes {
  async get(): Promise<GetRecipes.Response> {
    const { data } = await fetch("/data.json").then((response) =>
      response.json()
    )
    return data
  }
}
