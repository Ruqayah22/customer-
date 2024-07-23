// routes/customers.js
import express from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customerController.js";

const router = express.Router();

// Get all customers
router.get("/", getCustomers);

// Get a customer by ID
router.get("/:id", getCustomerById);

// Create a new customer
router.post("/", createCustomer);

// Update a customer
router.put("/:id", updateCustomer);

// Delete a customer
router.delete("/:id", deleteCustomer);

export default router;
