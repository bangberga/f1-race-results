import usePagnination from "../hooks/usePagination";
import List from "./List";
import PaginationButtons from "./PaginationButtons";

interface ListContainerProps {
  title: string;
  data: any[];
  x: string;
  y: string;
}

export default function ListContainer(props: ListContainerProps) {
  const { title, data, x, y } = props;
  const { paginated, index, handlePageIndex } = usePagnination(data);

  return (
    <div>
      <h1 className="title">{title}</h1>
      {paginated.length === 0 ? (
        <p>No drivers found</p>
      ) : (
        <>
          <PaginationButtons
            size={paginated.length}
            index={index}
            handlePageIndex={handlePageIndex}
          />
          {paginated[index].map((driver, i) => {
            const { year, data } = driver;
            return (
              <List key={i} data={data} title={year.toString()} x={x} y={y} />
            );
          })}
        </>
      )}
    </div>
  );
}
