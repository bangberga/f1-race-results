import {
  FILTER,
  UPDATE_FILTERS,
  UPDATE_SORT,
  UPDATE_DATA,
  SORT,
} from "../actions";
import Drivers from "../interfaces/Drivers";
import Races from "../interfaces/Races";
import Teams from "../interfaces/Teams";

interface UPDATE_DATA_ACTION {
  type: typeof UPDATE_DATA;
  payload: {
    races: Races[];
    drivers: Drivers[];
    teams: Teams[];
  };
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
  | SORT_ACTION
  | UPDATE_SORT_ACTION
  | UPDATE_DATA_ACTION;

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
  allData: {
    races: Races[];
    drivers: Drivers[];
    teams: Teams[];
  };
  filteredData: {
    races: Races[];
    drivers: Drivers[];
    teams: Teams[];
  };
  filter: Filter;
  sort: Sort;
}

const filter_reducer = (state: States, action: Actions): States => {
  if (action.type === UPDATE_DATA) {
    return {
      ...state,
      allData: { ...action.payload },
      filteredData: { ...action.payload },
    };
  }
  if (action.type === SORT) {
    const {
      filteredData: { races, drivers, teams },
      sort: { year },
    } = state;
    let tempRaces: Races[] = [];
    let tempDrivers: Drivers[] = [];
    let tempTeams: Teams[] = [];
    if (year === "asc") {
      tempRaces = races.sort((a, b) => a.year - b.year);
      tempDrivers = drivers.sort((a, b) => a.year - b.year);
      tempTeams = teams.sort((a, b) => a.year - b.year);
    } else if (year === "desc") {
      tempRaces = races.sort((a, b) => b.year - a.year);
      tempDrivers = drivers.sort((a, b) => b.year - a.year);
      tempTeams = teams.sort((a, b) => b.year - a.year);
    }

    return {
      ...state,
      filteredData: {
        races: tempRaces,
        drivers: tempDrivers,
        teams: tempTeams,
      },
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
      allData: { races, drivers, teams },
    } = state;
    let tempRaces = [...races];
    let tempDrivers = [...drivers];
    let tempTeams = [...teams];
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
      filteredData: {
        races: tempRaces,
        drivers: tempDrivers,
        teams: tempTeams,
      },
    };
  }
  return state;
};

export default filter_reducer;
