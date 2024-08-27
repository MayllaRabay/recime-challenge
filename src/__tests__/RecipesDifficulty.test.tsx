import { RecipesDifficulty } from "@/app/components"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

const mockSetState = jest.fn()
const mockState = {
  recipeDifficulty: "easy"
}

describe("RecipesDifficulty", () => {
  beforeEach(() => {
    mockSetState.mockClear()
  })

  it("renders filter buttons", () => {
    render(<RecipesDifficulty state={mockState} setState={mockSetState} />)

    const easyButton = screen.getByText(/Easy/i)
    const mediumButton = screen.getByText(/Medium/i)
    const hardButton = screen.getByText(/Hard/i)

    expect(easyButton).toBeInTheDocument()
    expect(mediumButton).toBeInTheDocument()
    expect(hardButton).toBeInTheDocument()
  })

  it("calls setState with the correct new state when easy button is clicked", () => {
    render(<RecipesDifficulty state={mockState} setState={mockSetState} />)

    const easyButton = screen.getByText(/Easy/i)
    fireEvent.click(easyButton)

    // Simulate setState function behavior
    const setStateCallback = mockSetState.mock.calls[0][0]
    const newState = setStateCallback(mockState)

    expect(newState.recipeDifficulty).toBe("Easy")
  })

  it("calls setState with the correct new state when medium button is clicked", () => {
    render(<RecipesDifficulty state={mockState} setState={mockSetState} />)

    const mediumButton = screen.getByText(/Medium/i)
    fireEvent.click(mediumButton)

    const setStateCallback = mockSetState.mock.calls[0][0]
    const newState = setStateCallback(mockState)

    expect(newState.recipeDifficulty).toBe("Medium")
  })

  it("calls setState with the correct new state when hard button is clicked", () => {
    render(<RecipesDifficulty state={mockState} setState={mockSetState} />)

    const hardButton = screen.getByText(/Hard/i)
    fireEvent.click(hardButton)

    const setStateCallback = mockSetState.mock.calls[0][0]
    const newState = setStateCallback(mockState)

    expect(newState.recipeDifficulty).toBe("Hard")
  })
})
