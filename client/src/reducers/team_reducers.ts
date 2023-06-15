import {
  LOADING_TEAMS_BEGIN,
  LOADING_TEAMS_FAIL,
  LOADING_TEAMS_SUCCESS,
} from "../actions";
import Teams from "../interfaces/Teams";

interface LOADING_TEAMS_BEGIN_ACTION {
  type: typeof LOADING_TEAMS_BEGIN;
}
interface LOADING_TEAMS_FAIL_ACTION {
  type: typeof LOADING_TEAMS_FAIL;
}
interface LOADING_TEAMS_SUCCESS_ACTION {
  type: typeof LOADING_TEAMS_SUCCESS;
  payload: Teams[];
}

export type Actions =
  | LOADING_TEAMS_BEGIN_ACTION
  | LOADING_TEAMS_FAIL_ACTION
  | LOADING_TEAMS_SUCCESS_ACTION;

export interface States {
  teams: Teams[];
  loading: boolean;
  error: boolean;
}

const team_reducer = (state: States, action: Actions): States => {
  if (action.type === LOADING_TEAMS_BEGIN) {
    return { ...state, loading: true, error: false };
  }
  if (action.type === LOADING_TEAMS_FAIL) {
    return { ...state, loading: false, error: true };
  }
  if (action.type === LOADING_TEAMS_SUCCESS) {
    return { ...state, loading: false, error: false, teams: action.payload };
  }
  return state;
};

export default team_reducer;
