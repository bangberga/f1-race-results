import {
  ChangeEvent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  FILTER,
  LOAD_DRIVERS,
  LOAD_RACES,
  LOAD_TEAMS,
  SORT,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from "../actions";
import reducer, { Filter, Sort, States } from "../reducers/filters_reducers";
import { useRacesContext } from "./races_context";
import { useDriversContext } from "./driers_context";
import { useTeamsContext } from "./team_context";

interface FiltersProviderProps {
  children: ReactNode | undefined;
}

const inititalStates: States = {
  filteredRaces: [],
  allRaces: [],
  filteredDrivers: [],
  allDrivers: [],
  allTeams: [],
  filteredTeams: [],
  sort: {
    year: "asc",
  },
  filter: {
    grandPrix: "",
    team: "",
    driver: "",
    year: 0,
  },
};

interface FiltersContextProps extends States {
  updateSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  updatesFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FiltersContext = createContext<FiltersContextProps>(
  inititalStates as FiltersContextProps
);

export default function FiltersProvider(props: FiltersProviderProps) {
  const { children } = props;
  const { races } = useRacesContext();
  const { drivers } = useDriversContext();
  const { teams } = useTeamsContext();
  const [state, dispatch] = useReducer(reducer, inititalStates);

  useEffect(() => {
    dispatch({ type: LOAD_RACES, payload: races });
  }, [races]);

  useEffect(() => {
    dispatch({ type: LOAD_DRIVERS, payload: drivers });
  }, [drivers]);

  useEffect(() => {
    dispatch({ type: LOAD_TEAMS, payload: teams });
  }, [teams]);

  useEffect(() => {
    dispatch({ type: FILTER });
    dispatch({ type: SORT });
  }, [state.sort, state.filter]);

  const updateSort = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const filterName = name as keyof Sort;
    const filterValue = value as Sort[keyof Sort];
    dispatch({
      type: UPDATE_SORT,
      payload: { name: filterName, value: filterValue },
    });
  }, []);

  const updatesFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const filterName = name as keyof Filter;
    dispatch({ type: UPDATE_FILTERS, payload: { name: filterName, value } });
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        ...state,
        updateSort,
        updatesFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFiltersContext() {
  return useContext<FiltersContextProps>(FiltersContext);
}
