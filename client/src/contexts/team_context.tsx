import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer, { States } from "../reducers/team_reducers";
import {
  LOADING_TEAMS_BEGIN,
  LOADING_TEAMS_FAIL,
  LOADING_TEAMS_SUCCESS,
} from "../actions";
import { teams_url as url } from "../utils/constants";
import Teams, { instancesOfTeams } from "../interfaces/Teams";

interface TeamsProviderProps {
  children: ReactNode | undefined;
}

const inititalStates = {
  teams: [],
  loading: false,
  error: false,
};

interface TeamsContextProps extends States {}

const TeamsContext = createContext<TeamsContextProps>(inititalStates);

export default function TeamsProvider(props: TeamsProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, inititalStates);

  const fetchTeams = useCallback(async (url: string) => {
    dispatch({ type: LOADING_TEAMS_BEGIN });
    try {
      const { data } = await axios.get(url);

      const teams: Teams[] = [];
      if (Array.isArray(data)) {
        data.forEach((d) => instancesOfTeams(d) && teams.push(d));
      }
      dispatch({ type: LOADING_TEAMS_SUCCESS, payload: teams });
    } catch (error) {
      dispatch({ type: LOADING_TEAMS_FAIL });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTeams(url);
  }, [fetchTeams]);

  return (
    <TeamsContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeamsContext() {
  return useContext<TeamsContextProps>(TeamsContext);
}
