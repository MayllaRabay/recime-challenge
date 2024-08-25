import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Subtitle = styled.p`
  color: #a8a8b3;
`

const ButtonWrapper = styled(Wrapper)`
  flex-direction: row;
  padding: 1.5rem 0 3rem 0;
  button:first-child {
    border-radius: 12px 0 0 12px;
  }
  button:last-child {
    border-radius: 0 12px 12px 0;
  }
`

const Button = styled.button<{ $active?: boolean }>`
  border: 1px solid ${(props) => (props.$active ? "#fcaa52" : "#a8a8b3")};
  background-color: ${(props) => (props.$active ? "#fcaa52" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#545454")};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem 2.5rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: ${(props) => (props.$active ? "#ffffff" : "#fcaa52")};
    border: 1px solid #fcaa52;
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
