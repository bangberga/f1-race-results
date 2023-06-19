import { ReactNode, createContext, useContext, useMemo } from "react";
import { teams_url as url } from "../utils/constants";
import Teams, { instancesOfTeams } from "../interfaces/Teams";
import useFetch from "../hooks/useFetch";

interface TeamsProviderProps {
  children: ReactNode | undefined;
}

interface TeamsContextProps {
  teams: Teams[];
  loading: boolean;
  error: boolean;
}

const inititalStates: TeamsContextProps = {
  teams: [],
  loading: false,
  error: false,
};

const TeamsContext = createContext<TeamsContextProps>(inititalStates);

export default function TeamsProvider(props: TeamsProviderProps) {
  const { children } = props;
  const { data, error, loading } = useFetch(url);

  const teams = useMemo(() => {
    const teams: Teams[] = [];
    if (Array.isArray(data)) {
      data.forEach((d) => instancesOfTeams(d) && teams.push(d));
    }
    return teams;
  }, [data]);

  return (
    <TeamsContext.Provider
      value={{
        loading,
        error,
        teams,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeamsContext() {
  return useContext<TeamsContextProps>(TeamsContext);
}
