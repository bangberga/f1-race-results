import Driver from "../components/Driver";

export default interface Drivers {
  year: number;
  data: Driver[];
}

export interface Driver {
  Pos: number;
  Driver: string;
  Nationality: string;
  Car: string;
  PTS: number;
}

export function instancesOfDriver(data: unknown): data is Driver {
  if (!data || typeof data !== "object") return false;
  return (
    "Pos" in data &&
    "Driver" in data &&
    "Nationality" in data &&
    "Car" in data &&
    "PTS" in data
  );
}

export function instancesOfDrivers(data: unknown): data is Drivers {
  if (!data || typeof data !== "object") return false;
  return "year" in data && "data" in data;
}

export function isArrDriver(data: any[]): data is Driver[] {
  return data.every((d) => instancesOfDriver(d));
}
