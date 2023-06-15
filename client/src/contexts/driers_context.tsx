import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer, { States } from "../reducers/driver_reducers";
import {
  LOADING_DRIVERS_BEGIN,
  LOADING_DRIVERS_FAIL,
  LOADING_DRIVERS_SUCCESS,
} from "../actions";
import { drivers_url as url } from "../utils/constants";
import Drivers, { instancesOfDrivers } from "../interfaces/Drivers";

interface DriversProviderProps {
  children: ReactNode | undefined;
}

const inititalStates = {
  drivers: [],
  loading: false,
  error: false,
};

interface DriversContextProps extends States {}

const DriversContext = createContext<DriversContextProps>(inititalStates);

export default function DriversProvider(props: DriversProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, inititalStates);

  const fetchDrivers = useCallback(async (url: string) => {
    dispatch({ type: LOADING_DRIVERS_BEGIN });
    try {
      const { data } = await axios.get(url);
      const drivers: Drivers[] = [];
      if (Array.isArray(data)) {
        data.forEach((d) => instancesOfDrivers(d) && drivers.push(d));
      }
      dispatch({ type: LOADING_DRIVERS_SUCCESS, payload: drivers });
    } catch (error) {
      dispatch({ type: LOADING_DRIVERS_FAIL });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchDrivers(url);
  }, [fetchDrivers]);

  return (
    <DriversContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
}

export function useDriversContext() {
  return useContext<DriversContextProps>(DriversContext);
}
