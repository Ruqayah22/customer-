import Employee from "../models/EmployeesSchema.js";
import fs from "fs";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-photo.data"); // Exclude photo data to reduce payload size if not needed
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching employees",
      error,
    });
  }
};

export const getEmployeePhoto = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("photo");
    if (employee && employee.photo && employee.photo.data) {
      // console.log("Photo data found:", employee.photo);
      res.set("Content-Type", employee.photo.contentType);
      return res.status(200).send(employee.photo.data);
    }
    res.status(404).send({ message: "Photo not found" });
  } catch (error) {
    console.error("Error while fetching photo:", error);
    res.status(500).send({
      success: false,
      message: "Error while fetching photo",
      error,
    });
  }
};

// Get one employee by ID
export const getEmployeesById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Single Employee Fetched",
      employee,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting single Employee",
      error,
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      birth,
      job,
      salary,
      address,
      date,
      debts,
      payments,
    } = req.fields;

    const { photo } = req.files;

    if (
      !name ||
      !phoneNumber ||
      !birth ||
      !job ||
      !salary ||
      !address ||
      !date
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).json({ error: "Photo should be less than 1MB" });
    }

    const employee = new Employee({
      ...req.fields,
      debts: debts || [],
      payments: payments || [],
    });

    if (photo) {
      employee.photo.data = fs.readFileSync(photo.path);
      employee.photo.contentType = photo.type;
    }

    await employee.save();
    res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
      employee,
    });
  } catch (error) {
    console.error("Error creating employee:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in creating employee",
      error: error.message,
    });
  }
};


// export const createEmployee = async (req, res) => {
//   try {
//     const {
//       name,
//       phoneNumber,
//       birth,
//       job,
//       salary,
//       address,
//       date,
//       debts,
//       payments,
//     } = req.fields;
    
//     const { photo } = req.files;

//     if (
//       !name ||
//       !phoneNumber ||
//       !birth ||
//       !job ||
//       !salary ||
//       !address ||
//       !date
//     ) {
//       return res.status(400).send({ error: "All fields are required" });
//     }

//     if (photo && photo.size > 1000000) {
//       return res.status(400).send({ error: "Photo should be less than 1MB" });
//     }

//     const employee = new Employee({
//       ...req.fields,
//       // debts: debts ? JSON.parse(debts) : [],
//       debts: debts || [],
//       // payments: payments ? JSON.parse(payments) : [],
//       payments: payments || [] ,
//     });

//     if (photo) {
//       employee.photo.data = fs.readFileSync(photo.path);
//       employee.photo.contentType = photo.type;
//     }

//     await employee.save();
//     res.status(201).send({
//       success: true,
//       message: "Employee Created Successfully",
//       employee,
//     });
//   } catch (error) {
//     console.log("Error creating employee:", error);
//     res.status(500).send({
//       success: false,
//       error: error.message,
//       message: "Error in creating employee",
//     });
//   }
// };


export const addDebtToEmployee = async (req, res) => {
  try {
    // console.log("Received request to add debt"); 
    const employeeId = req.params.id;
    const { amount, date } = req.body;

    // Validate input
    if (!amount || !date) {
      // console.log("Validation failed: Amount and date are required");
      return res.status(400).send({ error: "Amount and date are required" });
    }

    // console.log("Finding employee with ID:", employeeId);
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      // console.log("Employee not found with ID:", employeeId);
      return res.status(404).send({ error: "Employee not found" });
    }

    // console.log("Adding debt to employee:", { amount, date });
    employee.debts.push({ amount, date });
    await employee.save();

    // console.log("Debt added successfully, sending response");
    res.status(200).send({
      success: true,
      message: "Debt added successfully",
      employee,
    });
  } catch (error) {
    console.error("Error adding debt:", error);
    res.status(500).send({
      success: false,
      message: "Error adding debt",
      error: error.message,
    });
  }
};

export const addPaymentToEmployee = async (req, res) => {
  try {
    // console.log("Received request to add debt"); 
    const employeeId = req.params.id;
    const { amount, date } = req.body;

    // Validate input
    if (!amount || !date) {
      // console.log("Validation failed: Amount and date are required");
      return res.status(400).send({ error: "Amount and date are required" });
    }

    // console.log("Finding employee with ID:", employeeId);
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      // console.log("Employee not found with ID:", employeeId);
      return res.status(404).send({ error: "Employee not found" });
    }

    // console.log("Adding debt to employee:", { amount, date });
    employee.payments.push({ amount, date });
    await employee.save();

    // console.log("Debt added successfully, sending response");
    res.status(200).send({
      success: true,
      message: "Debt added successfully",
      employee,
    });
  } catch (error) {
    console.error("Error adding debt:", error);
    res.status(500).send({
      success: false,
      message: "Error adding debt",
      error: error.message,
    });
  }
};


// // Update an employee
// export const updateEmployee = async (req, res) => {
//   try {
//     console.log("Request received to update employee:", req.params.id);
//     console.log("Request body:", req.body);

//     const {
//       name,
//       phoneNumber,
//       birth,
//       job,
//       salary,
//       address,
//       date,
//       debts,
//       payments,
//     } = req.body;
//     const { photo } = req.files;
//     // const employeeId = req.params.id;

//     const employee = await Employee.findById(req.params.id);

//     if (!employee) {
//       // console.log("Employee not found:", employeeId);
//       return res.status(404).send({ error: "Employee not found" });
//     }

//     // Update fields and log changes
//     if (name) employee.name = name;
//     if (phoneNumber) employee.phoneNumber = phoneNumber;
//     if (birth) employee.birth = new Date(birth);
//     if (job) employee.job = job;
//     if (salary) employee.salary = salary;
//     if (address) employee.address = address;
//     if (date) employee.date = new Date(date);
//     if (debts) employee.debts = debts;
//     if (payments) employee.payments = payments;

//     // Handle photo update
//     if (photo) {
//       if (photo.size > 1000000) {
//         console.log("Photo size too large:", photo.size);
//         return res.status(400).send({ error: "Photo should be less than 1MB" });
//       }
//       employee.photo.data = fs.readFileSync(photo.path);
//       employee.photo.contentType = photo.type;
//     }

//     await employee.save();

//     console.log("Employee updated successfully:", employee);
//     res.status(200).send({
//       success: true,
//       message: "Employee updated successfully",
//       employee,
//     });

//     } catch (error) {
//       console.log("Error updating employee:", error);
//       res.status(500).send({
//         success: false,
//         error: error.message,
//         message: "Error in updating employee",
//       });
//     }
    
// };

// export const updateEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);

//     if (!employee) {
//       return res.status(404).send({ error: "Employee not found" });
//     }

//     const {
//       name,
//       phoneNumber,
//       birth,
//       job,
//       salary,
//       address,
//       date,
//       debts,
//       payments,
//     } = req.body;

//     if (name) employee.name = name;
//     if (phoneNumber) employee.phoneNumber = phoneNumber;
//     if (birth) employee.birth = new Date(birth);
//     if (job) employee.job = job;
//     if (salary) employee.salary = salary;
//     if (address) employee.address = address;
//     if (date) employee.date = new Date(date);
//     if (debts) employee.debts = debts;
//     if (payments) employee.payments = payments;

//     // Check if the request contains a photo
//     if (req.files && req.files.photo) {
//       const { photo } = req.files;
//       if (photo.size > 1000000) {
//         return res.status(400).send({ error: "Photo should be less than 1MB" });
//       }
//       employee.photo.data = fs.readFileSync(photo.path);
//       employee.photo.contentType = photo.type;
//     }

//     // Save the updated employee
//     await employee.save();

//     res.status(200).send({
//       success: true,
//       message: "Employee updated successfully",
//       employee,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error updating employee",
//       error: error.message,
//     });
//   }
// };

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    const {
      name,
      phoneNumber,
      birth,
      job,
      salary,
      address,
      date,
      debts,
      payments,
    } = req.fields; // Use req.fields instead of req.body

    if (name) employee.name = name;
    if (phoneNumber) employee.phoneNumber = phoneNumber;
    if (birth) employee.birth = new Date(birth);
    if (job) employee.job = job;
    if (salary) employee.salary = salary;
    if (address) employee.address = address;
    if (date) employee.date = new Date(date);
    if (debts) employee.debts = debts;
    if (payments) employee.payments = payments;

    // Check if the request contains a photo
    if (req.files && req.files.photo) {
      const { photo } = req.files;
      if (photo.size > 1000000) {
        return res.status(400).send({ error: "Photo should be less than 1MB" });
      }
      employee.photo.data = fs.readFileSync(photo.path);
      employee.photo.contentType = photo.type;
    }

    // Save the updated employee
    await employee.save();

    res.status(200).send({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating employee",
      error: error.message,
    });
  }
};


export const updateDebt = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const debtId = req.params.debtId;
    const { amount, date } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    const debt = employee.debts.id(debtId);
    if (!debt) {
      return res.status(404).send({ error: "Debt not found" });
    }

    debt.amount = amount;
    debt.date = new Date(date);
    await employee.save();

    res.status(200).send({
      success: true,
      message: "Debt updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error updating debt:", error);
    res.status(500).send({
      success: false,
      message: "Error updating debt",
      error: error.message,
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const paymentId = req.params.paymentId;
    const { amount, date } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    const payment = employee.payments.id(paymentId);
    if (!payment) {
      return res.status(404).send({ error: "payment not found" });
    }

    payment.amount = amount;
    payment.date = new Date(date);
    await employee.save();

    res.status(200).send({
      success: true,
      message: "Payment updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).send({
      success: false,
      message: "Error updating payment",
      error: error.message,
    });
  }
};


// Delete a employee
export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId).select(
      "-photo"
    );
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting Employee:", error.message);
    res.status(500).json({ message: "Failed to delete Employee" });
  }
};

// Delete a specific debt from an employee
export const deleteDebt = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID
    const { debtId } = req.body; // Debt ID to be deleted

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    employee.debts = employee.debts.filter(debt => debt._id.toString() !== debtId);
    await employee.save();

    res.status(200).send({ success: true, message: "Debt deleted successfully", employee });
  } catch (error) {
    console.error("Error deleting debt:", error);
    res.status(500).send({ success: false, message: "Error deleting debt", error });
  }
};

// Delete a specific payment from an employee
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID
    const { paymentId } = req.body; // Debt ID to be deleted

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    employee.payments = employee.payments.filter(
      (payment) => payment._id.toString() !== paymentId
    );
    await employee.save();

    res.status(200).send({ success: true, message: "Payment deleted successfully", employee });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).send({ success: false, message: "Error deleting payment", error });
  }
};
