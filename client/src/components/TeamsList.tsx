import styled from "styled-components";
import Loading from "./Loading";
import { useFiltersContext } from "../contexts/filters_context";
import { useTeamsContext } from "../contexts/team_context";
import Team from "./Team";

export default function TeamsList() {
  const { loading } = useTeamsContext();
  const { filteredTeams } = useFiltersContext();

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
                <h4>{year}</h4>
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
