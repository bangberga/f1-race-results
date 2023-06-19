import ListContainer from "../components/ListContainer";
import { useFiltersContext } from "../contexts/filters_context";

export default function Races() {
  const { filteredRaces } = useFiltersContext();
  return (
    <section>
      <ListContainer
        data={filteredRaces}
        title="Races"
        x="Laps"
        y="Grand Prix"
      />
    </section>
  );
}
