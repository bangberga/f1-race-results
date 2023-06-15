import cors from "cors";
import express from "express";
import {
  PORT,
  driversLinks,
  driversOutput,
  racesLinks,
  racesOutput,
  teamLinks,
  teamsOutput,
} from "./utils/constants";
import resultsRouter from "./routes/results";
import { writeData } from "./utils/helper";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/results", resultsRouter);

(async function () {
  try {
    // await Promise.all([
    //   writeData(racesLinks, racesOutput),
    //   writeData(driversLinks, driversOutput),
    //   writeData(teamLinks, teamsOutput),
    // ]);
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
