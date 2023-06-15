import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer, { States } from "../reducers/races_reducers";
import {
  LOADING_RACES_BEGIN,
  LOADING_RACES_FAIL,
  LOADING_RACES_SUCCESS,
} from "../actions";
import { races_url as url } from "../utils/constants";
import Races, { instancesOfRaces } from "../interfaces/Races";

interface RacesProviderProps {
  children: ReactNode | undefined;
}

const inititalStates = {
  races: [],
  loading: false,
  error: false,
};

interface RacesContextProps extends States {}

const RacesContext = createContext<RacesContextProps>(inititalStates);

export default function RacesProvider(props: RacesProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, inititalStates);

  const fetchRaces = useCallback(async (url: string) => {
    dispatch({ type: LOADING_RACES_BEGIN });
    try {
      const { data } = await axios.get(url);
      const races: Races[] = [];
      if (Array.isArray(data)) {
        data.forEach((d) => instancesOfRaces(d) && races.push(d));
      }
      dispatch({ type: LOADING_RACES_SUCCESS, payload: races });
    } catch (error) {
      dispatch({ type: LOADING_RACES_FAIL });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchRaces(url);
  }, [fetchRaces]);

  return (
    <RacesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </RacesContext.Provider>
  );
}

export function useRacesContext() {
  return useContext<RacesContextProps>(RacesContext);
}
