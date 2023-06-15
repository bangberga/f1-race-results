export default interface Races {
  year: number;
  data: Race[];
}

export interface Race {
  "Grand Prix": string;
  Date: string;
  Winner: string;
  Car: string;
  Laps: number;
  Time: string;
}

export function instancesOfRace(data: unknown): data is Race {
  if (!data || typeof data !== "object") return false;
  return (
    "Grand Prix" in data &&
    "Date" in data &&
    "Winner" in data &&
    "Car" in data &&
    "Laps" in data &&
    "Time" in data
  );
}

export function instancesOfRaces(data: unknown): data is Races {
  if (!data || typeof data !== "object") return false;
  return "year" in data && "data" in data;
}
