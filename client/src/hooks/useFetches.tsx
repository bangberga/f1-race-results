import { useCallback, useEffect, useReducer } from "react";
import { LOADING_BEGIN, LOADING_FAIL, LOADING_SUCCESS } from "../actions";
import reducer, { States } from "../reducers/use_fetch_reducers";
import axios from "axios";

const inititalStates: States = {
  data: [],
  loading: false,
  error: false,
};

export default function useFetches(urls: string[]) {
  const [states, dispatch] = useReducer(reducer, inititalStates);

  const fetchData = useCallback(async (urls: string[]) => {
    dispatch({ type: LOADING_BEGIN });
    try {
      const res = await Promise.all(urls.map((url) => axios.get(url)));
      dispatch({ type: LOADING_SUCCESS, payload: res.map(({ data }) => data) });
    } catch (error) {
      dispatch({ type: LOADING_FAIL });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(urls);
  }, [fetchData, urls]);
  return { ...states };
}
