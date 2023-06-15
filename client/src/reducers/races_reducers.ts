import {
  LOADING_RACES_BEGIN,
  LOADING_RACES_FAIL,
  LOADING_RACES_SUCCESS,
} from "../actions";
import Races from "../interfaces/Races";

interface LOADING_RACES_BEGIN_ACTION {
  type: typeof LOADING_RACES_BEGIN;
}
interface LOADING_RACES_FAIL_ACTION {
  type: typeof LOADING_RACES_FAIL;
}
interface LOADING_RACES_SUCCESS_ACTION {
  type: typeof LOADING_RACES_SUCCESS;
  payload: Races[];
}

export type Actions =
  | LOADING_RACES_BEGIN_ACTION
  | LOADING_RACES_FAIL_ACTION
  | LOADING_RACES_SUCCESS_ACTION;

export interface States {
  races: Races[];
  loading: boolean;
  error: boolean;
}

const race_reducer = (state: States, action: Actions): States => {
  if (action.type === LOADING_RACES_BEGIN) {
    return { ...state, loading: true, error: false };
  }
  if (action.type === LOADING_RACES_FAIL) {
    return { ...state, loading: false, error: true };
  }
  if (action.type === LOADING_RACES_SUCCESS) {
    return { ...state, loading: false, error: false, races: action.payload };
  }
  return state;
};

export default race_reducer;
