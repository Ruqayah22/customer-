import express from "express";

import {
  createProducer,
  deleteProducer,
  getProducer,
  getProducerById,
  updateProducer,
} from "../controller/StoredController.js";

const storedRouter = express.Router();

storedRouter.get("/", getProducer);

storedRouter.get("/:id", getProducerById);
storedRouter.post("/createProducer", createProducer);
storedRouter.put("/:id", updateProducer);
storedRouter.delete("/:id", deleteProducer);

export default storedRouter;
