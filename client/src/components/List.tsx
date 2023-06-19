import { MouseEventHandler } from "react";
import styled from "styled-components";
import { VscGraph } from "react-icons/vsc";
import usePagnination from "../hooks/usePagination";
import ListItem from "./ListItem";
import PaginationButtons from "./PaginationButtons";
import { useBarchartContext } from "../contexts/barchar_context";

interface ListProps {
  title: string;
  data: any[];
  x: string;
  y: string;
}

export default function List(props: ListProps) {
  const { title, data, x, y } = props;
  const { handlePageIndex, index, paginated } = usePagnination(data);
  const { showGraph } = useBarchartContext();

  return (
    <ListContainer>
      <header className="list-header">
        <h4>{title}</h4>
        <button onClick={() => showGraph(data, x, y)}>
          <VscGraph />
        </button>
      </header>
      <PaginationButtons
        handlePageIndex={handlePageIndex}
        index={index}
        size={paginated.length}
      />
      <hr />
      <div className="list-container">
        {paginated.length === 0 ? (
          <p>No data</p>
        ) : (
          <ListItem data={paginated[index]} />
        )}
      </div>
      <hr />
    </ListContainer>
  );
}

const ListContainer = styled.div`
  margin: 1rem 0;
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 2rem;
    row-gap: 1rem;
  }
  hr {
    margin: 1rem 0;
  }
`;
