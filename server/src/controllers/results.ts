import { RequestHandler } from "express";
import { driversLinks, racesLinks, teamLinks, years } from "../utils/constants";
import { scrapInformation, fetchHTML } from "../crawl";

const getAllRaces: RequestHandler = async (req, res) => {
  try {
    const htmlBodies = await Promise.all(
      racesLinks.map((link) => fetchHTML(link))
    );
    res.json(
      htmlBodies.map((htmlBody, i) => ({
        year: years[i],
        data: scrapInformation(htmlBody),
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

const getAllDrivers: RequestHandler = async (req, res) => {
  try {
    const htmlBodies = await Promise.all(
      driversLinks.map((link) => fetchHTML(link))
    );
    res.json(
      htmlBodies.map((htmlBody, i) => ({
        year: years[i],
        data: scrapInformation(htmlBody),
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

const getAllTeams: RequestHandler = async (req, res) => {
  try {
    const htmlBodies = await Promise.all(
      teamLinks.map((link) => fetchHTML(link))
    );
    res.json(
      htmlBodies.map((htmlBody, i) => ({
        year: years[i],
        data: scrapInformation(htmlBody),
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export { getAllRaces, getAllDrivers, getAllTeams };
