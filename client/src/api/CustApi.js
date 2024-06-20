// import axios from "axios";

// const custURL = "http://localhost:8000";

// export const getCustomers = async (id) => {
//   try {
//     id = id || "";
//     return await axios.get(`${custURL}/api/customers/${id}`);
//   } catch (error) {
//     // console.log("Error while calling get Customers API", error);
//     console.error("Error while calling get Customers API:", error);
//     throw error;
//   }
// };

// // export const getCustomerById = async (id) => {
// //   return await axios.get(`${custURL}/customers/${id}`);
// // };

// export const addCustomer = async (customer) => {
//   try {
//     return await axios.post(`${custURL}/api/customers/addCustomer`, customer);
//   } catch (error) {
//     console.log("Error while calling add Customer Api ", error);
//   }
// };

// // export const editCustomer = async (id, customer) => {
// //   try {
// //     return await axios.put(`${custURL}/customers/${id}`, customer); //${custURL}/customers/editCustomer/${id}
// //   } catch (error) {
// //     console.log("Error while calling edit Customer api ", error);
// //   }
// // };

// export const editCustomer = async (id, customer) => {
//   try {
//     return await axios.put(`${custURL}/api/customers/${id}`, customer);
//   } catch (error) {
//     console.log("Error while calling edit Customer api ", error);
//     throw error; 
//   }
// };


// export const deleteCustomer = async (id) => {
//   try {
//     return await axios.delete(`${custURL}/api/customers/${id}`); //(`${employURL}/employees/${id}`);
//   } catch (error) {
//     console.log("Error while delete Customer api ", error);
//   }
// };

// src/api/CustApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getCustomers = () => axios.get(`${BASE_URL}/customers`);

export const deleteCustomer = (id) => axios.delete(`${BASE_URL}/customers/${id}`);

export const addDebt = (customerId, debtData) => axios.post(`${BASE_URL}/customers/${customerId}/debts`, debtData);

export const addPayment = (customerId, paymentData) => axios.post(`${BASE_URL}/customers/${customerId}/payments`, paymentData);

export const addProduct = (customerId, productData) => axios.post(`${BASE_URL}/customers/${customerId}/products`, productData);
