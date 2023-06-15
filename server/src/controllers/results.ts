import { RequestHandler } from "express";
import { driversOutput, racesOutput, teamsOutput } from "../utils/constants";
import { getData } from "../utils/helper";

const getAllRaces: RequestHandler = async (req, res) => {
  try {
    res.json(await getData(racesOutput));
  } catch (error) {
    console.log(error);
  }
};

const getAllDrivers: RequestHandler = async (req, res) => {
  try {
    res.json(await getData(driversOutput));
  } catch (error) {
    console.log(error);
  }
};

const getAllTeams: RequestHandler = async (req, res) => {
  try {
    res.json(await getData(teamsOutput));
  } catch (error) {
    console.log(error);
  }
};

export { getAllRaces, getAllDrivers, getAllTeams };
