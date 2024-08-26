import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Subtitle = styled.p`
  color: var(--color-gray-M);
`

const ButtonWrapper = styled(Wrapper)`
  flex-direction: row;
  padding: 1.5rem 0 3rem 0;
  button:first-child {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
  button:last-child {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }
`

const Button = styled.button<{ $active?: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--color-gray-M)"};
  background-color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var( --color-gray-XL)"};
  color: ${(props) =>
    props.$active ? "var( --color-gray-XL)" : "var(--color-gray-XD)"};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem 2.5rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: ${(props) =>
      props.$active ? "var( --color-gray-XL)" : "var(--primary-color)"};
    border: 1px solid var(--primary-color);
  }
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`

type Props = {
  state: any
  setState: (newState: any) => void
}

export function RecipesDifficulty({ state, setState }: Props) {
  const buttons = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ]

  const changeDifficulty = (event: any) => {
    setState((old: any) => ({ ...old, recipeDifficulty: event.target.id }))
  }

  return (
    <Wrapper>
      <h3>Difficulty</h3>
      <Subtitle>You can filter recipes by difficulty.</Subtitle>
      <ButtonWrapper>
        {buttons.map((button, index) => {
          return (
            <Button
              key={index}
              id={button.value}
              type="button"
              aria-label={button.label}
              aria-pressed={state.recipeDifficulty === button.value}
              $active={state.recipeDifficulty === button.value}
              onClick={changeDifficulty}
            >
              {button.label}
            </Button>
          )
        })}
      </ButtonWrapper>
    </Wrapper>
  )
}
