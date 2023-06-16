export default interface Teams {
  year: number;
  data: Team[];
}

export interface Team {
  Pos: number;
  Team: string;
  PTS: number;
}

export function instancesOfTeam(data: unknown): data is Teams {
  if (!data || typeof data !== "object") return false;
  return "Pos" in data && "Team" in data && "PTS" in data;
}

export function instancesOfTeams(data: unknown): data is Teams {
  if (!data || typeof data !== "object") return false;
  return "year" in data && "data" in data;
}

export function isArrTeam(data: any[]): data is Team[] {
  return data.every((d) => instancesOfTeam(d));
}
