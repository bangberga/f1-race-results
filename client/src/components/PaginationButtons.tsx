import { useMemo } from "react";
import { styled } from "styled-components";

interface PaginationButtonsProps {
  size: number;
  index: number;
  handlePageIndex: (i: number) => void;
}

export default function PaginationButtons(props: PaginationButtonsProps) {
  const { size, index, handlePageIndex } = props;

  const indexes = useMemo(
    () => Array.from({ length: size }, (_, i) => i),
    [size]
  );

  const buttons = useMemo(
    () =>
      indexes.map((i) => {
        if (i === 0 || i === size - 1) return { value: i, text: i };
        const d = Math.abs(i - index);
        if (d === 3) return { value: i, text: "..." };
        if (d > 2) return { value: -1 };
        return { value: i, text: i };
      }),
    [indexes, size, index]
  );

  return (
    <ButtonsContainer>
      {index !== 0 && (
        <button onClick={() => handlePageIndex(index - 1)}>{"<"}</button>
      )}
      {buttons.map(({ value, text }, i) => (
        <span key={i}>
          {value >= 0 ? (
            <button
              className={`${index === value ? "active" : ""}`}
              onClick={() => handlePageIndex(value)}
            >
              {text}
            </button>
          ) : (
            <></>
          )}
        </span>
      ))}
      {index < size - 1 && (
        <button onClick={() => handlePageIndex(index + 1)}>{">"}</button>
      )}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  span {
  }
  button {
    background: var(--clr-grey-9);
    color: var(--clr-grey-3);
    font-size: larger;
    width: 30px;
    height: 30px;
    margin: 0 3px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    &.active {
      background: var(--clr-grey-3);
      color: var(--clr-grey-9);
    }
  }
`;
