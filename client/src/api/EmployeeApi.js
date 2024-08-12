import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;


export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/employee/${id}`);

// export const addDebt = (employeeId, debtData) =>
//   axios.post(`${BASE_URL}/employee/${employeeId}/addDebt`, debtData);

export const addDebt = (employeeId, debtData) => {
  // console.log("Sending request to add debt:", { employeeId, debtData });
  return axios
    .post(`${BASE_URL}/employee/${employeeId}/addDebt`, debtData)
    .then((response) => {
      // console.log("Debt added successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding debt:", error);
      throw error;
    });
};

// export const addPayment = (employeeId, paymentData) =>
//   axios.post(`${BASE_URL}/employee/${employeeId}/payments`, paymentData);

export const addPayment = (employeeId, paymentData) => {
  // console.log("Sending request to add payment:", { employeeId, paymentData });
  return axios
    .post(`${BASE_URL}/employee/${employeeId}/addPayment`, paymentData)
    .then((response) => {
      // console.log("Payment added successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding payment:", error);
      throw error;
    });
};
