import styled from "styled-components";
import { Race as IRace } from "../interfaces/Races";

interface RaceProps {
  race: IRace;
}

export default function Race(props: RaceProps) {
  const {
    race: { "Grand Prix": grandPrix, Date, Winner, Car, Laps, Time },
  } = props;
  return (
    <RaceContainer>
      <header>
        <p className="grand-prix">
          <b>Grand Prix:</b> {grandPrix}
        </p>
        <p className="date">{Date.substring(0, Date.length - 5)}</p>
      </header>
      <hr />
      <aside>
        <p>
          <b>Winner:</b> {Winner}
        </p>
        <p>
          <b>Car:</b> {Car}
        </p>
        <p>
          <b>Laps:</b> {Laps}
        </p>
        <p>
          <b>Time:</b> {Time}
        </p>
      </aside>
    </RaceContainer>
  );
}

const RaceContainer = styled.article`
  background: var(--clr-white);
  padding: 5px;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
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
