
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
router.get("/getEmployees", getEmployees);

// Get a employee by ID
router.get("/getEmployee/:id", getEmployeesById);



// Create a new employee
router.post("/createEmployee", formidable(), createEmployee);

// Update a employee
router.put("/:id", formidable(), updateEmployee);

// Delete a employee
router.delete("/:id", deleteEmployee);

//get photo
// router.get("/employeePhoto/:pid", employeePhotoController);
router.get("/employeePhoto/:id", getEmployeePhoto);

export default router;

// import express from "express";
// import {
//   createEmployee,
//   getEmployees,
//   getEmployeeById,
//   updateEmployee,
//   deleteEmployee,
//   addDebt,
//   addPayment,
// } from "../controller/EmployeesController.js";

// const router = express.Router();

// router.post("/createEmployee", createEmployee);
// router.get("/", getEmployees);
// router.get("/:id", getEmployeeById);
// router.put("/:id", updateEmployee);
// router.delete("/:id", deleteEmployee);
// router.post("/:id/debts", addDebt);
// router.post("/:id/payments", addPayment);

// export default router;
