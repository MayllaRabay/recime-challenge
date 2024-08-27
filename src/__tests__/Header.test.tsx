import { Header } from "@/app/components/"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("Header", () => {
  it("renders the header", () => {
    render(<Header />)
    const titleElement = screen.getByText(/Recipes/i)
    expect(titleElement).toBeInTheDocument()
  })
})
