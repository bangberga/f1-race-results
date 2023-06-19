import { useFiltersContext } from "../contexts/filters_context";
import ListContainer from "../components/ListContainer";

export default function Drivers() {
  const { filteredDrivers } = useFiltersContext();

  return (
    <section>
      <ListContainer
        data={filteredDrivers}
        title="Driver"
        x="Points"
        y="Drivers"
      />
    </section>
  );
}
