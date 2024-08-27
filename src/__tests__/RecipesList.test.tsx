import { RecipesList } from "@/app/components"
import { RecipesContext } from "@/app/main/contexts"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("RecipesList", () => {
  it("displays a message when no recipes are available", () => {
    const mockContextValue = {
      recipes: [],
      setRecipes: jest.fn(),
      error: false,
      isLoading: false
    }

    render(
      <RecipesContext.Provider value={mockContextValue}>
        <RecipesList />
      </RecipesContext.Provider>
    )

    const emptyMessage = screen.getByText(
      /It looks like there are no burger recipes available at the moment/i
    )
    expect(emptyMessage).toBeInTheDocument()
  })
})
