export const baseUrl = "https://www.formula1.com";
export const resultsUrl = "https://www.formula1.com/en/results.html";
export const PORT = 5000;

export const years = Array.from(
  { length: 2023 - 1950 + 1 },
  (_, index) => 1950 + index
);

export const racesLinks = years.map(
  (year) => `${resultsUrl}/${year}/races.html`
);
export const driversLinks = years.map(
  (year) => `${resultsUrl}/${year}/drivers.html`
);
export const teamLinks = years.map((year) => `${resultsUrl}/${year}/team.html`);

export const racesOutput = "races.ts";
export const driversOutput = "drivers.ts";
export const teamsOutput = "teams.ts";
