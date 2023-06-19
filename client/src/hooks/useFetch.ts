import { useCallback, useEffect, useReducer } from "react";
import { LOADING_BEGIN, LOADING_FAIL, LOADING_SUCCESS } from "../actions";
import reducer, { States } from "../reducers/use_fetch_reducers";
import axios from "axios";

const inititalStates: States = {
  data: [],
  loading: false,
  error: false,
};

export default function useFetch(url: string) {
  const [states, dispatch] = useReducer(reducer, inititalStates);

  const fetchData = useCallback(async (url: string) => {
    dispatch({ type: LOADING_BEGIN });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: LOADING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOADING_FAIL });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(url);
  }, [fetchData, url]);
  return { ...states };
}
