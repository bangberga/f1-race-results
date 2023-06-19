import { ReactNode, createContext, useContext, useMemo } from "react";
import { drivers_url as url } from "../utils/constants";
import Drivers, { instancesOfDrivers } from "../interfaces/Drivers";
import useFetch from "../hooks/useFetch";

interface DriversProviderProps {
  children: ReactNode | undefined;
}

interface DriversContextProps {
  drivers: Drivers[];
  loading: boolean;
  error: boolean;
}

const inititalStates: DriversContextProps = {
  drivers: [],
  loading: false,
  error: false,
};

const DriversContext = createContext<DriversContextProps>(inititalStates);

export default function DriversProvider(props: DriversProviderProps) {
  const { children } = props;
  const { data, error, loading } = useFetch(url);

  const drivers = useMemo(() => {
    const drivers: Drivers[] = [];
    if (Array.isArray(data)) {
      data.forEach((d) => instancesOfDrivers(d) && drivers.push(d));
    }
    return drivers;
  }, [data]);

  return (
    <DriversContext.Provider
      value={{
        loading,
        error,
        drivers,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
}

export function useDriversContext() {
  return useContext<DriversContextProps>(DriversContext);
}
