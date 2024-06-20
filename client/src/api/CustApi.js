import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getCustomers = () => axios.get(`${BASE_URL}/customers`);

export const deleteCustomer = (id) => axios.delete(`${BASE_URL}/customers/${id}`);

export const addDebt = (customerId, debtData) => axios.post(`${BASE_URL}/customers/${customerId}/debts`, debtData);

export const addPayment = (customerId, paymentData) => axios.post(`${BASE_URL}/customers/${customerId}/payments`, paymentData);

export const addProduct = (customerId, productData) => axios.post(`${BASE_URL}/customers/${customerId}/products`, productData);
