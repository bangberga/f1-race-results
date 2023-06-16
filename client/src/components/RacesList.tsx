import styled from "styled-components";
import { VscGraph } from "react-icons/vsc";
import Race from "../components/Race";
import { useFiltersContext } from "../contexts/filters_context";
import { useRacesContext } from "../contexts/races_context";
import { useBarchartContext } from "../contexts/barchar_context";
import Loading from "./Loading";

export default function RacesList() {
  const { loading } = useRacesContext();
  const { filteredRaces } = useFiltersContext();
  const { updateData, handleShow, handleTitle } = useBarchartContext();

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
                <header className="list-header">
                  <h4>{year}</h4>
                  <button
                    onClick={() => {
                      updateData(data);
                      handleTitle("x", "Laps");
                      handleTitle("y", "Grand Prix");
                      handleShow(true);
                    }}
                  >
                    <VscGraph />
                  </button>
                </header>
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

const RacesListContainer = styled.div``;
