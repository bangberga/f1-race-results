import styled from "styled-components";
import { Driver } from "../interfaces/Drivers";

interface DriverProps {
  driver: Driver;
}

export default function (props: DriverProps) {
  const {
    driver: { Driver, Car, Nationality, PTS, Pos },
  } = props;
  return (
    <RaceContainer>
      <header>
        <p>
          <b>Driver:</b> {Driver}
        </p>
      </header>
      <hr />
      <aside>
        <p>
          <b>Nationality:</b> {Nationality}
        </p>
        <p>
          <b>Car:</b> {Car}
        </p>
        <p>
          <b>Points:</b> {PTS}
        </p>
        <p>
          <b>Position:</b> {Pos}
        </p>
      </aside>
    </RaceContainer>
  );
}

const RaceContainer = styled.article`
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
