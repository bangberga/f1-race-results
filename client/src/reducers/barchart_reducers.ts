import { BARCHART_UPDATE_DATA, HANDLE_SHOW, HANDLE_TITLE } from "../actions";

interface BARCHART_UPDATE_DATA_ACTION {
  type: typeof BARCHART_UPDATE_DATA;
  payload: any[];
}

interface HANDLE_SHOW_ACTION {
  type: typeof HANDLE_SHOW;
  payload: boolean;
}

interface HANDLE_TITLE_ACTION {
  type: typeof HANDLE_TITLE;
  payload: { name: keyof Title; value: Title[keyof Title] };
}
type Actions =
  | BARCHART_UPDATE_DATA_ACTION
  | HANDLE_SHOW_ACTION
  | HANDLE_TITLE_ACTION;

export interface Margin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
export interface Title {
  x: string;
  y: string;
}

export interface States {
  width: number;
  height: number;
  margin: Margin;
  data: any[];
  title: Title;
  show: boolean;
}

const barchart_reducer = (state: States, action: Actions): States => {
  if (action.type === BARCHART_UPDATE_DATA) {
    return { ...state, data: action.payload };
  }
  if (action.type === HANDLE_SHOW) {
    return { ...state, show: action.payload };
  }
  if (action.type === HANDLE_TITLE) {
    return {
      ...state,
      title: { ...state.title, [action.payload.name]: action.payload.value },
    };
  }
  return state;
};

export default barchart_reducer;
