import { LOADING_BEGIN, LOADING_SUCCESS, LOADING_FAIL } from "../actions";

interface LOADING_BEGIN_ACTION {
  type: typeof LOADING_BEGIN;
}
interface LOADING_FAIL_ACTION {
  type: typeof LOADING_FAIL;
}
interface LOADING_SUCCESS_ACTION {
  type: typeof LOADING_SUCCESS;
  payload: any[];
}

export type Actions =
  | LOADING_BEGIN_ACTION
  | LOADING_FAIL_ACTION
  | LOADING_SUCCESS_ACTION;

export interface States {
  data: any[];
  loading: boolean;
  error: boolean;
}

const use_fetch_reducer = (state: States, action: Actions): States => {
  if (action.type === LOADING_BEGIN) {
    return { ...state, loading: true, error: false };
  }
  if (action.type === LOADING_FAIL) {
    return { ...state, loading: false, error: true };
  }
  if (action.type === LOADING_SUCCESS) {
    return { ...state, loading: false, error: false, data: action.payload };
  }
  return state;
};

export default use_fetch_reducer;
