import ListContainer from "../components/ListContainer";
import { useFiltersContext } from "../contexts/filters_context";

export default function Teams() {
  const {
    filteredData: { teams },
  } = useFiltersContext();

  return (
    <section>
      <ListContainer data={teams} title="Teams" x="Points" y="Name" />
    </section>
  );
}
