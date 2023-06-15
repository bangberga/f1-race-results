import styled from "styled-components";
import Race from "../components/Race";
import { useFiltersContext } from "../contexts/filters_context";
import { useRacesContext } from "../contexts/races_context";
import Loading from "./Loading";

export default function RacesList() {
  const { loading } = useRacesContext();
  const { filteredRaces } = useFiltersContext();

  return (
    <RacesListContainer>
      <h1 className="title">Races</h1>
      {loading ? (
        <Loading />
      ) : filteredRaces.length === 0 ? (
        <p>No races found</p>
      ) : (
        <div>
          {filteredRaces.map((race, i) => {
            const { year, data } = race;
            return (
              <div key={i} className="list-section">
                <h4>{year}</h4>
                <hr />
                {data.length === 0 && <p className="no-data">No data</p>}
                <div className="list-container">
                  {data.map((race, i) => (
                    <Race race={race} key={i} />
                  ))}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </RacesListContainer>
  );
}

const RacesListContainer = styled.div`
  .races-section {
    margin: 1rem 0;
    .no-data {
      color: var(--clr-grey-3);
      font-weight: lighter;
      font-style: italic;
    }
    .races-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      column-gap: 2rem;
      row-gap: 1rem;
    }
    hr {
      margin: 1rem 0;
    }
  }
`;
