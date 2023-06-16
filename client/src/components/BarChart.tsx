import { styled } from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { useBarchartContext } from "../contexts/barchar_context";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Marks from "./Marks";

export default function BarChart() {
  const {
    width,
    height,
    margin: { left, top },
    show,
    handleShow,
  } = useBarchartContext();

  return (
    <BarchartContainer show={show ? 1 : 0}>
      <button className="close" onClick={() => handleShow(false)}>
        <TfiClose />
      </button>
      <svg width={width} height={height}>
        <g transform={`translate(${left},${top})`}>
          <XAxis />
          <YAxis />
          <Marks />
        </g>
      </svg>
    </BarchartContainer>
  );
}

const BarchartContainer = styled.div<{ show: number }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  backdrop-filter: blur(4px);
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 3rem;
    background: transparent;
    border: none;
    z-index: 5;
    cursor: pointer;
    &:hover {
      color: dodgerblue;
    }
  }
  svg {
    background: var(--clr-white);
    .line {
      stroke: grey;
    }
    .tick-value {
      fill: grey;
      font-weight: light;
      stroke-width: 0;
      &.title-axis {
        font-weight: bold;
      }
    }
  }
`;
