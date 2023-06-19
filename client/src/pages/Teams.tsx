import ListContainer from "../components/ListContainer";
import { useFiltersContext } from "../contexts/filters_context";

export default function Teams() {
  const { filteredTeams } = useFiltersContext();

  return (
    <section>
      <ListContainer data={filteredTeams} title="Teams" x="Points" y="Name" />
    </section>
  );
}
