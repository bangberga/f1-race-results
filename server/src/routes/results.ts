import { Router } from "express";
import {
  getAllDrivers,
  getAllRaces,
  getAllTeams,
} from "../controllers/results";

const router = Router();

router.route("/races").get(getAllRaces);
router.route("/drivers").get(getAllDrivers);
router.route("/team").get(getAllTeams);

export default router;
