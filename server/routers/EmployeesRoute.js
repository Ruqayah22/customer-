import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeesById,
  updateEmployee,
  getEmployeePhoto,
  addDebtToEmployee,
  addPaymentToEmployee,
  deleteDebt,
  deletePayment,
  updateDebt,
  updatePayment,
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

// Add a new debt to an employee
router.post("/:id/addDebt", addDebtToEmployee); 

// Add a new debt to an employee
router.post("/:id/addPayment", addPaymentToEmployee); 

// Delete a specific debt from an employee
router.delete("/:id/debts", deleteDebt);

// Delete a specific payment from an employee
router.delete("/:id/payments", deletePayment);

router.put("/:id/debts/:debtId", updateDebt);

router.put("/:id/payments/:paymentId", updatePayment);


export default router;

