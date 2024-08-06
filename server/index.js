import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import customersRouter from "./routers/customersRoute.js";
import storedRouter from "./routers/StoredRoutes.js";
import employeeRouter from "./routers/EmployeesRoute.js"

const app = express();

dotenv.config();

app.use(bodyParser.json()); 

app.use(cors()); 

// Routes
app.use("/customers", customersRouter);
app.use("/stored", storedRouter);
app.use("/employee", employeeRouter);

const PORT = 8000;


Connection();

app.listen(PORT, () =>
  console.log(`Server is running successfully on http://localhost:${PORT}`)
);
