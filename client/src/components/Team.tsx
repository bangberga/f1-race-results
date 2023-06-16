import styled from "styled-components";
import { Team as ITeam } from "../interfaces/Teams";

interface TeamProps {
  team: ITeam;
}

export default function Team(props: TeamProps) {
  const {
    team: { Team, PTS, Pos },
  } = props;
  return (
    <TeamContainer>
      <header>
        <p>
          <b>Name:</b> {Team}
        </p>
      </header>
      <hr />
      <aside>
        <p>
          <b>Points:</b> {PTS}
        </p>
        <p>
          <b>Position:</b> {Pos}
        </p>
      </aside>
    </TeamContainer>
  );
}

const TeamContainer = styled.article`
  background: var(--clr-white);
  padding: 5px;
  border-radius: var(--radius);
  box-shadow: 5px 5px 10px lightgray;
  p {
    margin: 0;
    font-size: small;
  }
  header {
    height: max-content;
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 0;
  }
`;
