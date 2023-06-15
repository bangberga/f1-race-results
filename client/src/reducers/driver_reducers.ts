import {
  LOADING_DRIVERS_BEGIN,
  LOADING_DRIVERS_FAIL,
  LOADING_DRIVERS_SUCCESS,
} from "../actions";
import Drivers from "../interfaces/Drivers";

interface LOADING_DRIVERS_BEGIN_ACTION {
  type: typeof LOADING_DRIVERS_BEGIN;
}
interface LOADING_DRIVERS_FAIL_ACTION {
  type: typeof LOADING_DRIVERS_FAIL;
}
interface LOADING_DRIVERS_SUCCESS_ACTION {
  type: typeof LOADING_DRIVERS_SUCCESS;
  payload: Drivers[];
}

export type Actions =
  | LOADING_DRIVERS_BEGIN_ACTION
  | LOADING_DRIVERS_FAIL_ACTION
  | LOADING_DRIVERS_SUCCESS_ACTION;

export interface States {
  drivers: Drivers[];
  loading: boolean;
  error: boolean;
}

const driver_reducer = (state: States, action: Actions): States => {
  if (action.type === LOADING_DRIVERS_BEGIN) {
    return { ...state, loading: true, error: false };
  }
  if (action.type === LOADING_DRIVERS_FAIL) {
    return { ...state, loading: false, error: true };
  }
  if (action.type === LOADING_DRIVERS_SUCCESS) {
    return { ...state, loading: false, error: false, drivers: action.payload };
  }
  return state;
};

export default driver_reducer;
