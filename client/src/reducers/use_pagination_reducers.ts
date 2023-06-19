import { UPDATE_DATA, PAGINATE, HANDLE_PAGE_INDEX } from "../actions";

interface UPDATE_DATA_ACTION<T> {
  type: typeof UPDATE_DATA;
  payload: T[];
}
interface PAGINATE_ACTION {
  type: typeof PAGINATE;
}
interface HANDLE_PAGE_INDEX_ACTION {
  type: typeof HANDLE_PAGE_INDEX;
  payload: number;
}

export type Actions<T> =
  | PAGINATE_ACTION
  | HANDLE_PAGE_INDEX_ACTION
  | UPDATE_DATA_ACTION<T>;

export interface States<T> {
  index: number;
  numPage: number;
  page: T[];
  paginated: T[][];
}

const use_pagination_reducer = <T>(
  state: States<T>,
  action: Actions<T>
): States<T> => {
  if (action.type === UPDATE_DATA) {
    return { ...state, page: action.payload, index: 0 };
  }
  if (action.type === HANDLE_PAGE_INDEX) {
    const { page, index } = state;
    const { payload } = action;
    let newIndex = index;
    if (payload < page.length || payload >= 0) newIndex = payload;
    return { ...state, index: newIndex };
  }
  if (action.type === PAGINATE) {
    const { numPage, page } = state;
    let itemEachPage = Math.round(page.length / numPage);
    if (itemEachPage < 1) itemEachPage = 1;
    const paginated: T[][] = [];
    for (let i = 0; i < page.length; i += itemEachPage) {
      paginated.push(page.slice(i, i + itemEachPage));
    }
    return { ...state, paginated };
  }

  return state;
};

export default use_pagination_reducer;
