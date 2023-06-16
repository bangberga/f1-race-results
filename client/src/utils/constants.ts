import { timeParse } from "d3";

export const links = [
  {
    id: 1,
    text: "races",
    url: "/races",
  },
  {
    id: 2,
    text: "drivers",
    url: "/drivers",
  },
  {
    id: 3,
    text: "teams",
    url: "/teams",
  },
];

export const races_url = "http://localhost:5000/api/v1/results/races";
export const drivers_url = "http://localhost:5000/api/v1/results/drivers";
export const teams_url = "http://localhost:5000/api/v1/results/team";
