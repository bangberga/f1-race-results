import { useId } from "react";
import styled from "styled-components";
import { useFiltersContext } from "../contexts/filters_context";

export default function Filters() {
  const id = useId();
  const {
    sort: { year },
    filter: { driver, grandPrix, team },
    updateSort,
    updatesFilter,
  } = useFiltersContext();

  return (
    <FiltersContainer>
      <div>
        <label htmlFor={`${id}-year`}>Year</label>
        <select
          value={year}
          name="year"
          onChange={updateSort}
          id={`${id}-year`}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-driver`}>Driver</label>
        <input
          type="text"
          name="driver"
          value={driver}
          onChange={updatesFilter}
          id={`${id}-driver`}
        />
      </div>
      <div>
        <label htmlFor={`${id}-grand_prix`}>Grand Prix</label>
        <input
          type="text"
          name="grandPrix"
          value={grandPrix}
          onChange={updatesFilter}
          id={`${id}-grand_prix`}
        />
      </div>
      <div>
        <label htmlFor={`${id}-team`}>Team</label>
        <input
          type="text"
          name="team"
          value={team}
          onChange={updatesFilter}
          id={`${id}-team`}
        />
      </div>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  margin: 2rem auto;
  width: 50%;
  background: var(--clr-white);
  padding: 10px 20px;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  div {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    margin: 10px 0;
    input,
    select {
      border: none;
      border-radius: var(--radius);
      background: var(--clr-background);
    }
  }
`;
