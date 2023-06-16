import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useMemo,
} from "react";
import reducer, { States, Title } from "../reducers/barchart_reducers";
import { BARCHART_UPDATE_DATA, HANDLE_SHOW, HANDLE_TITLE } from "../actions";
import { ScaleBand, ScaleLinear, max, scaleBand, scaleLinear } from "d3";
import { isArrDriver } from "../interfaces/Drivers";
import { isArrTeam } from "../interfaces/Teams";
import { isArrRace } from "../interfaces/Races";

interface BarchartProviderProps {
  children: ReactNode | undefined;
}

const inititalStates: States = {
  width: 960,
  height: 480,
  margin: { top: 30, left: 150, right: 30, bottom: 50 },
  title: {
    x: "",
    y: "",
  },
  data: [],
  show: false,
};

interface BarchartContextProps extends States {
  innerWidth: number;
  innerHeight: number;
  xScale: ScaleLinear<number, number, never> | undefined;
  yScale: ScaleBand<string> | undefined;
  updateData: (data: any[]) => void;
  handleTitle: (name: keyof Title, value: Title[keyof Title]) => void;
  handleShow: (s: boolean) => void;
}

const BarchartContext = createContext<BarchartContextProps>(
  inititalStates as BarchartContextProps
);

export default function BarchartProvider(props: BarchartProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, inititalStates);
  const {
    width,
    height,
    margin: { top, bottom, left, right },
    data,
  } = state;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;

  const xScale = useMemo(() => {
    if (isArrDriver(data)) {
      const maxPts = max(data, (d) => +d.PTS) || 0;
      return scaleLinear().range([0, innerWidth]).domain([0, maxPts]).nice();
    }
    if (isArrTeam(data)) {
      const maxPts = max(data, (d) => +d.PTS) || 0;
      return scaleLinear().range([0, innerWidth]).domain([0, maxPts]).nice();
    }
    if (isArrRace(data)) {
      const maxLaps = max(data, (d) => +d.Laps) || 0;
      return scaleLinear().range([0, innerWidth]).domain([0, maxLaps]).nice();
    }
  }, [data, innerWidth]);

  const yScale = useMemo(() => {
    if (isArrDriver(data)) {
      return scaleBand()
        .range([0, innerHeight])
        .domain(data.map((d) => d.Driver))
        .padding(0.2);
    }
    if (isArrTeam(data)) {
      return scaleBand()
        .range([0, innerHeight])
        .domain(data.map((d) => d.Team))
        .padding(0.2);
    }
    if (isArrRace(data)) {
      return scaleBand()
        .range([0, innerHeight])
        .domain(data.map((d) => d["Grand Prix"]))
        .padding(0.2);
    }
  }, [data, innerHeight]);

  const updateData = useCallback((data: any[]) => {
    dispatch({ type: BARCHART_UPDATE_DATA, payload: data });
  }, []);

  const handleTitle = useCallback(
    (name: keyof Title, value: Title[keyof Title]) => {
      dispatch({ type: HANDLE_TITLE, payload: { name, value } });
    },
    []
  );

  const handleShow = useCallback((s: boolean) => {
    dispatch({ type: HANDLE_SHOW, payload: s });
  }, []);

  return (
    <BarchartContext.Provider
      value={{
        ...state,
        innerHeight,
        innerWidth,
        xScale,
        yScale,
        updateData,
        handleTitle,
        handleShow,
      }}
    >
      {children}
    </BarchartContext.Provider>
  );
}

export function useBarchartContext() {
  return useContext<BarchartContextProps>(BarchartContext);
}
