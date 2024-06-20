import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import customersRouter from "./routers/customers.js";


const app = express();

dotenv.config();

app.use(bodyParser.json()); 

app.use(cors());

// app.use("/", Routes);
// app.use("/customers", customerRouter);

// Routes
app.use("/customers", customersRouter);


const PORT = 8000;


Connection();

app.listen(PORT, () =>
  console.log(`Server is running successfully on http://localhost:${PORT}`)
);
