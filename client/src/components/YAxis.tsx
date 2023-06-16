import { styled } from "styled-components";
import { useBarchartContext } from "../contexts/barchar_context";

export default function YAxis() {
  const {
    yScale,
    innerHeight,
    title: { y },
  } = useBarchartContext();
  if (!yScale) return <></>;

  return (
    <YAxisContainer>
      <line y2={innerHeight} className="line" />
      {yScale.domain().map((tick, i) => {
        const name = tick.length > 15 ? `${tick.slice(0, 13)}...` : tick;
        return (
          <g key={i} transform={`translate(0,${yScale(tick)})`}>
            <text className="tick-value" x={-5} y={yScale.bandwidth() / 2}>
              {name}
            </text>
          </g>
        );
      })}
      <text
        className="tick-value title-axis"
        transform={`translate(${-120}, ${innerHeight / 2 - 30}) rotate(-90)`}
      >
        {y}
      </text>
    </YAxisContainer>
  );
}

const YAxisContainer = styled.g`
  .tick-value {
    text-anchor: end;
    font-size: small;
  }
`;
