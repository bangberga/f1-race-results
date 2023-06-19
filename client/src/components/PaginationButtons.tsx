import { styled } from "styled-components";

interface PaginationButtonsProps {
  size: number;
  index: number;
  handlePageIndex: (i: number) => void;
}

export default function PaginationButtons(props: PaginationButtonsProps) {
  const { size, index, handlePageIndex } = props;

  return (
    <ButtonsContainer>
      {Array.from({ length: size }, (_, i) => i).map((d) => {
        return (
          <button
            key={d}
            className={`${index === d ? "active" : ""}`}
            onClick={() => handlePageIndex(d)}
          >
            {d}
          </button>
        );
      })}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  button.active {
    background: green;
  }
`;
