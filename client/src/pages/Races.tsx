import ListContainer from "../components/ListContainer";
import { useFiltersContext } from "../contexts/filters_context";

export default function Races() {
  const {
    filteredData: { races },
  } = useFiltersContext();
  return (
    <section>
      <ListContainer data={races} title="Races" x="Laps" y="Grand Prix" />
    </section>
  );
}
