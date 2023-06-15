import {
  FILTER,
  UPDATE_FILTERS,
  UPDATE_SORT,
  LOAD_RACES,
  SORT,
  LOAD_DRIVERS,
  LOAD_TEAMS,
} from "../actions";
import Drivers from "../interfaces/Drivers";
import Races from "../interfaces/Races";
import Teams from "../interfaces/Teams";

interface LOAD_RACES_ACTION {
  type: typeof LOAD_RACES;
  payload: Races[];
}
interface LOAD_DRIVERS_ACTION {
  type: typeof LOAD_DRIVERS;
  payload: Drivers[];
}
interface LOAD_TEAMS_ACTION {
  type: typeof LOAD_TEAMS;
  payload: Teams[];
}

interface SORT_ACTION {
  type: typeof SORT;
}

interface UPDATE_SORT_ACTION {
  type: typeof UPDATE_SORT;
  payload: { name: keyof Sort; value: Sort[keyof Sort] };
}

interface FILTER_ACTION {
  type: typeof FILTER;
}

interface UPDATE_FILTERS_ACTION {
  type: typeof UPDATE_FILTERS;
  payload: { name: keyof Filter; value: Filter[keyof Filter] };
}

export type Actions =
  | FILTER_ACTION
  | UPDATE_FILTERS_ACTION
  | LOAD_RACES_ACTION
  | LOAD_DRIVERS_ACTION
  | LOAD_TEAMS_ACTION
  | SORT_ACTION
  | UPDATE_SORT_ACTION;

export interface Filter {
  grandPrix: string;
  year: number;
  driver: string;
  team: string;
}

export interface Sort {
  year: "asc" | "desc";
}

export interface States {
  allRaces: Races[];
  filteredRaces: Races[];
  allDrivers: Drivers[];
  filteredDrivers: Drivers[];
  allTeams: Teams[];
  filteredTeams: Teams[];
  filter: Filter;
  sort: Sort;
}

const race_reducer = (state: States, action: Actions): States => {
  if (action.type === LOAD_RACES) {
    return {
      ...state,
      allRaces: [...action.payload],
      filteredRaces: [...action.payload],
    };
  }
  if (action.type === LOAD_DRIVERS) {
    return {
      ...state,
      allDrivers: [...action.payload],
      filteredDrivers: [...action.payload],
    };
  }
  if (action.type === LOAD_TEAMS) {
    return {
      ...state,
      allTeams: [...action.payload],
      filteredTeams: [...action.payload],
    };
  }
  if (action.type === SORT) {
    const {
      filteredRaces,
      filteredDrivers,
      filteredTeams,
      sort: { year },
    } = state;
    let tempRaces: Races[] = [];
    let tempDrivers: Drivers[] = [];
    let tempTeams: Teams[] = [];
    if (year === "asc") {
      tempRaces = filteredRaces.sort((a, b) => a.year - b.year);
      tempDrivers = filteredDrivers.sort((a, b) => a.year - b.year);
      tempTeams = filteredTeams.sort((a, b) => a.year - b.year);
    } else if (year === "desc") {
      tempRaces = filteredRaces.sort((a, b) => b.year - a.year);
      tempDrivers = filteredDrivers.sort((a, b) => b.year - a.year);
      tempTeams = filteredTeams.sort((a, b) => b.year - a.year);
    }

    return {
      ...state,
      filteredRaces: tempRaces,
      filteredDrivers: tempDrivers,
      filteredTeams: tempTeams,
    };
  }
  if (action.type === UPDATE_SORT) {
    const { name, value } = action.payload;
    return { ...state, sort: { [name]: value } };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    const updatedFilter = { ...state.filter, [name]: value };
    return { ...state, filter: updatedFilter };
  }
  if (action.type === FILTER) {
    const {
      filter: { driver, grandPrix, team },
      allRaces,
      allDrivers,
      allTeams,
    } = state;
    let tempRaces = [...allRaces];
    let tempDrivers = [...allDrivers];
    let tempTeams = [...allTeams];
    if (driver) {
      tempRaces = tempRaces.map((races) => ({
        ...races,
        data: races.data.filter((race) =>
          race.Winner.toLowerCase().startsWith(driver.toLowerCase())
        ),
      }));
      tempDrivers = tempDrivers.map((drivers) => ({
        ...drivers,
        data: drivers.data.filter((d) =>
          d.Driver.toLowerCase().startsWith(driver.toLowerCase())
        ),
      }));
    }
    if (grandPrix) {
      tempRaces = tempRaces.map((races) => ({
        ...races,
        data: races.data.filter((race) =>
          race["Grand Prix"].toLowerCase().startsWith(grandPrix.toLowerCase())
        ),
      }));
    }
    if (team) {
      tempTeams = tempTeams.map((teams) => ({
        ...teams,
        data: teams.data.filter((t) =>
          t.Team.toLowerCase().startsWith(team.toLowerCase())
        ),
      }));
    }
    return {
      ...state,
      filteredRaces: tempRaces,
      filteredDrivers: tempDrivers,
      filteredTeams: tempTeams,
    };
  }
  return state;
};

export default race_reducer;
