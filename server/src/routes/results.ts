import { Router } from "express";
import { getAllResults } from "../controllers/results";

const router = Router();

router.route("/").get(getAllResults);

export default router;
