import { styled } from "styled-components";
import { useBarchartContext } from "../contexts/barchar_context";

export default function XAxis() {
  const {
    xScale,
    innerHeight,
    innerWidth,
    title: { x },
  } = useBarchartContext();
  if (!xScale) return <></>;
  return (
    <XAxisContainer transform={`translate(0, ${innerHeight})`}>
      <line x2={innerWidth} className="line" />
      {xScale.ticks().map((tick, i) => {
        const scale = xScale(tick);
        return (
          <g key={i} transform={`translate(${scale},0)`}>
            <line y2={5} className="line" />
            <text className="tick-value" y={20}>
              {tick}
            </text>
          </g>
        );
      })}
      <text className="tick-value title-axis" x={innerWidth / 2} y={40}>
        {x}
      </text>
    </XAxisContainer>
  );
}

const XAxisContainer = styled.g`
  .tick-value {
    text-anchor: middle;
  }
`;
