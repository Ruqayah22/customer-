import Employee from "../models/EmployeesSchema.js";
import fs from "fs";

// // Get all employees
// export const getEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find({})
//       .select("-photo")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       counTotal: employees.length,
//       message: "ALl Employees ",
//       employees,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error in getting Employees",
//       error: error.message,
//     });
//   }
// };

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

// export const getEmployeePhoto = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id).select("photo");
//     // if (employee.photo.data) {
//     if (employee && employee.photo && employee.photo.data) {
//       res.set("Content-Type", employee.photo.contentType);
//       return res.status(200).send(employee.photo.data);
//     }
//     res.status(404).send({ message: "Photo not found" });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error while fetching photo",
//       error,
//     });
//   }
// };

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
    const employee = await Employee.findById(req.params.id).select("photo");
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
    

    const { name, phoneNumber, birth, job, salary, address, date } = req.fields;
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
      return res.status(400).send({ error: "All fields are required" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const employee = new Employee({
      ...req.fields
    });

    if (photo) {
      employee.photo.data = fs.readFileSync(photo.path);
      employee.photo.contentType = photo.type;
    }

    await employee.save();
    res.status(201).send({
      success: true,
      message: "Employee Created Successfully",
      employee,
    });
  } catch (error) {
    console.log("Error creating employee:", error); // Detailed logging
    res.status(500).send({
      success: false,
      error: error.message, // Sending the error message to the client for better debugging
      message: "Error in creating employee",
    });
  }
}


// // get photo

// export const employeePhotoController = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.pid).select("photo");
//     if (employee.photo.data) {
//       res.set("Content-type", employee.photo.contentType);
//       return res.status(200).send(employee.photo.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting photo",
//       error,
//     });
//   }
// };



// Update a employee
export const updateEmployee = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      birth,
      job,
      salary,
      address,
      date,
      // debts,
      // payments,
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
      // ||
      // !debts ||
      // !payments
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1MB" });
    }


    // Check if photo exists before proceeding
    if (photo) {
      const employee = await Employee.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields },
        { new: true }
      );

      employee.photo.data = fs.readFileSync(photo.path);
      employee.photo.contentType = photo.type;

      await employee.save();
      res.status(201).send({
        success: true,
        message: "Employee Updated Successfully",
        employee,
      });
    } else {
      // If photo doesn't exist, update product without it
      const employee = await Employee.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields },
        { new: true }
      );
      res.status(201).send({
        success: true,
        message: "Employee Updated Successfully",
        employee,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Employees",
    });
  }
};



// Delete a employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Employee Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Employee",
      error,
    });
  }
};

