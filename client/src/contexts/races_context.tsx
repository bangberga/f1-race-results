import { ReactNode, createContext, useContext, useMemo } from "react";
import { races_url as url } from "../utils/constants";
import Races, { instancesOfRaces } from "../interfaces/Races";
import useFetch from "../hooks/useFetch";

interface RacesProviderProps {
  children: ReactNode | undefined;
}

interface RacesContextProps {
  races: Races[];
  loading: boolean;
  error: boolean;
}

const inititalStates: RacesContextProps = {
  races: [],
  loading: false,
  error: false,
};

const RacesContext = createContext<RacesContextProps>(inititalStates);

export default function RacesProvider(props: RacesProviderProps) {
  const { children } = props;
  const { data, error, loading } = useFetch(url);

  const races = useMemo(() => {
    const races: Races[] = [];
    if (Array.isArray(data)) {
      data.forEach((d) => instancesOfRaces(d) && races.push(d));
    }
    return races;
  }, [data]);

  return (
    <RacesContext.Provider
      value={{
        loading,
        error,
        races,
      }}
    >
      {children}
    </RacesContext.Provider>
  );
}

export function useRacesContext() {
  return useContext<RacesContextProps>(RacesContext);
}
