import styled from "styled-components";
import { VscGraph } from "react-icons/vsc";
import { useFiltersContext } from "../contexts/filters_context";
import { useTeamsContext } from "../contexts/team_context";
import { useBarchartContext } from "../contexts/barchar_context";
import Loading from "./Loading";
import Team from "./Team";

export default function TeamsList() {
  const { loading } = useTeamsContext();
  const { filteredTeams } = useFiltersContext();
  const { updateData, handleTitle, handleShow } = useBarchartContext();

  return (
    <TeamsListContainer>
      <h1 className="title">Teams</h1>
      {loading ? (
        <Loading />
      ) : filteredTeams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div>
          {filteredTeams.map((team, i) => {
            const { year, data } = team;
            return (
              <div key={i} className="list-section">
                <header className="list-header">
                  <h4>{year}</h4>
                  <button
                    onClick={() => {
                      updateData(data);
                      handleTitle("x", "Points");
                      handleTitle("y", "Teams");
                      handleShow(true);
                    }}
                  >
                    <VscGraph />
                  </button>
                </header>
                <hr />
                {data.length === 0 && <p>No data</p>}
                <div className="list-container">
                  {data.map((team, i) => (
                    <Team team={team} key={i} />
                  ))}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </TeamsListContainer>
  );
}

const TeamsListContainer = styled.div``;
