import { Reducer, useCallback, useEffect, useReducer } from "react";
import { Actions, States } from "../reducers/use_pagination_reducers";
import { HANDLE_PAGE_INDEX, PAGINATE, UPDATE_DATA } from "../actions";
import reducer from "../reducers/use_pagination_reducers";

const inititalStates = {
  index: 0,
  numPage: 10,
  page: [],
  paginated: [],
};

export default function usePagnination<T>(data: T[]) {
  const [states, dispatch] = useReducer<Reducer<States<T>, Actions<T>>>(
    reducer,
    inititalStates
  );

  useEffect(() => {
    dispatch({ type: UPDATE_DATA, payload: data });
  }, [data]);

  useEffect(() => {
    dispatch({ type: PAGINATE });
  }, [states.page]);

  const handlePageIndex = useCallback(
    (i: number) => {
      if (i === states.index) return;
      dispatch({ type: HANDLE_PAGE_INDEX, payload: i });
    },
    [states.index]
  );

  return { ...states, handlePageIndex };
}
