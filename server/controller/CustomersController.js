// import CustomerDB from "../models/CustomersSchema.js";

// export const getCustomers = async (req, res) => {
//   try {
//     const customers = await CustomerDB.find();

//     res.status(200).json(customers);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getCustomerById = async (req, res) => {
//   try {
//     const customer = await CustomerDB.findById(req.params.id);

//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const addCustomer = async (req, res) => {
//   const {
//     name,
//     phoneNumber,
//     debt,
//     debtDate,
//     payment,
//     paymentDate,
//     buyer,
//     number,
//     note,
//   } = req.body;
//   try {
//     const newCustomer = new CustomerDB({
//       name,
//       phoneNumber,
//       debt,
//       debtDate: new Date(`${debtDate}`),
//       payment,
//       paymentDate: new Date(`${paymentDate}`),
//       buyer,
//       number,
//       note,
//     });
//     await newCustomer.save();
//     res.status(201).json(newCustomer);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// export const editCustomer = async (req, res) => {
//   const {
//     name,
//     phoneNumber,
//     debt,
//     debtDate,
//     payment,
//     paymentDate,
//     buyer,
//     number,
//     note,
//   } = req.body;

//   try {
//     // Construct the update object with the new values
//     const updateCustomer = {
//       name,
//       phoneNumber,
//       debt,
//       debtDate: new Date(debtDate), // Convert date string to Date object
//       payment,
//       paymentDate: new Date(paymentDate), // Convert date string to Date object
//       buyer,
//       number,
//       note,
//     };

//     // Update the customer document in the database
//     await CustomerDB.updateOne({ _id: req.params.id }, updateCustomer);

//     // Send a success response
//     res.status(200).json({ message: "Customer updated successfully" });
//   } catch (error) {
//     // Handle errors
//     res.status(409).json({ message: error.message });
//   }
// };

// export const deleteCustomer = async (req, res) => {
//   try {
//     await CustomerDB.deleteOne({ _id: req.params.id });
//     res.status(201).json({ message: "Customer deleted Successfully" });
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };
