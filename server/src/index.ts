require("express-async-errors");

import express from "express";
import { PORT } from "./utils/constants";
import resultsRouter from "./routes/results";

const app = express();

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("hello from express"));
app.use("/api/v1/results", resultsRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
