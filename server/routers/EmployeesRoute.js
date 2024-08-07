
import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeesById,
  updateEmployee,
  getEmployeePhoto,
  } from "../controller/EmployeesController.js";
import formidable from "express-formidable";

const router = express.Router();

// Get all employees
router.get("/", getEmployees);

// Get a employee by ID
router.get("/:id", getEmployeesById);



// Create a new employee
router.post("/createEmployee", formidable(), createEmployee);

// Update an employee
router.put("/:id", formidable(), updateEmployee);

// Delete a employee
router.delete("/:id", deleteEmployee);

//get photo
// router.get("/employeePhoto/:pid", employeePhotoController);
router.get("/employeePhoto/:id", getEmployeePhoto);

export default router;

