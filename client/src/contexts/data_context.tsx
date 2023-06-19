import { ReactNode, createContext, useContext, useMemo } from "react";
import { drivers_url, races_url, teams_url } from "../utils/constants";
import Drivers, { instancesOfDrivers } from "../interfaces/Drivers";
import Teams, { instancesOfTeams } from "../interfaces/Teams";
import Races, { instancesOfRaces } from "../interfaces/Races";
import useFetches from "../hooks/useFetches";

interface DataProviderProps {
  children: ReactNode | undefined;
}

interface DataContextProps {
  data: {
    drivers: Drivers[];
    teams: Teams[];
    races: Races[];
  };
  loading: boolean;
  error: boolean;
}

const urls = [drivers_url, races_url, teams_url];

const inititalStates: DataContextProps = {
  data: {
    drivers: [],
    races: [],
    teams: [],
  },
  loading: false,
  error: false,
};

const DataContext = createContext<DataContextProps>(inititalStates);

export default function DataProvider(props: DataProviderProps) {
  const { children } = props;
  const { data, loading, error } = useFetches(urls);

  const drivers = useMemo(() => {
    const drivers: Drivers[] = [];
    if (Array.isArray(data?.[0])) {
      data[0].forEach((d) => instancesOfDrivers(d) && drivers.push(d));
    }
    return drivers;
  }, [data]);

  const races = useMemo(() => {
    const races: Races[] = [];
    if (Array.isArray(data?.[1])) {
      data[1].forEach((d) => instancesOfRaces(d) && races.push(d));
    }
    return races;
  }, [data]);

  const teams = useMemo(() => {
    const teams: Teams[] = [];
    if (Array.isArray(data?.[2])) {
      data[2].forEach((d) => instancesOfTeams(d) && teams.push(d));
    }
    return teams;
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        data: {
          drivers,
          races,
          teams,
        },
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext<DataContextProps>(DataContext);
}
