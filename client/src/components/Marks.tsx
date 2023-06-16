import { styled } from "styled-components";
import { useBarchartContext } from "../contexts/barchar_context";

export default function Marks() {
  const { data, yScale, xScale } = useBarchartContext();
  if (!yScale || !xScale) return <></>;

  return (
    <MarksContainer>
      {data.map((d, i) => {
        const bandWidth = yScale.bandwidth();

        return (
          <rect
            className="mark"
            key={i}
            x={0}
            y={yScale(d.Driver || d.Team || d["Grand Prix"])}
            width={xScale(d.PTS || d.Laps)}
            height={bandWidth}
          >
            <title>{d.PTS || d.Laps}</title>
          </rect>
        );
      })}
    </MarksContainer>
  );
}

const MarksContainer = styled.g`
  .mark {
    fill: dodgerblue;
  }
`;
