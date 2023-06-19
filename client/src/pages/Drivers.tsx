import { useFiltersContext } from "../contexts/filters_context";
import ListContainer from "../components/ListContainer";

export default function Drivers() {
  const {
    filteredData: { drivers },
  } = useFiltersContext();

  return (
    <section>
      <ListContainer data={drivers} title="Driver" x="Points" y="Drivers" />
    </section>
  );
}
