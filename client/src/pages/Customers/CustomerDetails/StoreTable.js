import React, { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
import { getProducer } from "../../../api/StoredApi";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const StoreTable = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  const [producers, setProducers] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/customers/${id}`)
      .then((response) => {
        const customerData = response.data;
        if (!Array.isArray(customerData.fromStore)) {
          customerData.fromStore = [];
        }

        setCustomer(customerData);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer details!",
          error
        );
      });
  }, [id]);

  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount)
      ? "0.00"
      : parsedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
  };

  // get product information
  useEffect(() => {
    getAllProducer();
  }, []);

  const getAllProducer = async () => {
    let response = await getProducer();
    setProducers(response.data);
  };

  // Function to find the producer by ID
  const findProducerNameById = (id) => {
    const producer = producers.find((p) => p._id === id);

    return producer ? producer.name : "Unknown";
  };

  // Delete functions for Debt, Payment, and Buyer
  const handleDeleteItem = (type, itemId) => {
    const updatedCustomer = {
      ...customer,
      [type]: customer[type].filter((item) => item._id !== itemId),
    };

    axios
      .put(`${apiUrl}/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  if (!customer) return <Typography>Loading...</Typography>;

  function formatCurrency(amount, currency) {
    switch (currency) {
      case "$":
        return `$${amount}`;
      case "IQD":
        return `${formatAmount(amount)} IQD`;
      default:
        return `${amount.toFixed(2)}`;
    }
  }

  if (!customer) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: "20px", marginRight: "40px" }}
        fontWeight={"bold"}
      >
        المخزن
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>البضاعة </TableCell>
              <TableCell>العدد </TableCell>
              <TableCell>السعر </TableCell>
              <TableCell>السعر الكلي </TableCell>
              <TableCell>التاريخ </TableCell>
              <TableCell>{/*Actions*/}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.fromStore.map((store) => (
              <TableRow key={store._id}>
                <TableCell>{findProducerNameById(store.name)}</TableCell>
                <TableCell>{store.quantity}</TableCell>
                <TableCell>
                  {formatCurrency(store.amount, store.currency)}
                </TableCell>
                <TableCell>
                  {formatCurrency(
                    store.amount * store.quantity,
                    store.currency
                  )}
                </TableCell>
                <TableCell>{formatDate(store.date)}</TableCell>
                <TableCell>
                  <IconButton
                    variant="contained"
                    color="primary"
                    sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                    onClick={() => handleDeleteItem("fromStore", store._id)}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StoreTable;
