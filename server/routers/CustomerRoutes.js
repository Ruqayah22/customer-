// // routes/customers.js
// import express from "express";
// import Customer from "../models/CustomersSchema.js"; // Ensure the path is correct

// const router = express.Router();

// // Get all customers
// router.get('/', async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get a single customer
// router.get('/:id', getCustomer, (req, res) => {
//   res.json(res.customer);
// });

// // Create a customer
// router.post('/', async (req, res) => {
//   const customer = new Customer({
//     name: req.body.name,
//     phoneNumber: req.body.phoneNumber,
//     debt: req.body.debt,
//     debtDate: req.body.debtDate,
//   });
//   try {
//     const newCustomer = await customer.save();
//     res.status(201).json(newCustomer);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update a customer
// router.patch('/:id', getCustomer, async (req, res) => {
//   if (req.body.name != null) {
//     res.customer.name = req.body.name;
//   }
//   if (req.body.phoneNumber != null) {
//     res.customer.phoneNumber = req.body.phoneNumber;
//   }
//   if (req.body.debt != null) {
//     res.customer.debt = req.body.debt;
//   }
//   if (req.body.debtDate != null) {
//     res.customer.debtDate = req.body.debtDate;
//   }
//   try {
//     const updatedCustomer = await res.customer.save();
//     res.json(updatedCustomer);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a customer
// router.delete('/:id', getCustomer, async (req, res) => {
//   try {
//     await res.customer.remove();
//     res.json({ message: 'Deleted Customer' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// async function getCustomer(req, res, next) {
//   let customer;
//   try {
//     customer = await Customer.findById(req.params.id);
//     if (customer == null) {
//       return res.status(404).json({ message: 'Cannot find customer' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.customer = customer;
//   next();
// }

// export default router;

// // import express from "express";

// // import {
// //   addCustomer,
// //   deleteCustomer,
// //   editCustomer,
// //   getCustomerById,
// //   getCustomers,
// // } from "../controller/CustomersController.js";

// // const customerRouter = express.Router();

// // customerRouter.get("/", getCustomers);
// // customerRouter.get("/:id", getCustomerById);
// // customerRouter.post("/addCustomer", addCustomer);
// // customerRouter.put("/:id", editCustomer);
// // customerRouter.delete("/:id", deleteCustomer);

// // export default customerRouter;
