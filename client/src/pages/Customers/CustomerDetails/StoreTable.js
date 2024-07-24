import React, { useEffect, useState } from "react";
import {
  // Box,
  // Button,
  Container,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import ClearIcon from "@mui/icons-material/Clear";
// import EditIcon from "@mui/icons-material/Edit";
// import PrintIcon from "@mui/icons-material/Print";

// import PrintDialog from "../PrintDialog";
import {  useParams } from "react-router-dom";
import { getProducer } from "../../../api/StoredApi";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const StoreTable = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  // const [editItem, setEditItem] = useState(null);
  // const [editDialogOpen, setEditDialogOpen] = useState(false);

  // const [printDialogOpen, setPrintDialogOpen] = useState(false);
  // const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [producers, setProducers] = useState([]);

  
  useEffect(() => {
    axios
      .get(`${apiUrl}/customers/${id}`)
      .then((response) => {
        const customerData = response.data;
// console.log("Retrieved customer data:", customerData);
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
    // console.log("Found producer:", producer); // Debugging line

    return producer ? producer.name : "Unknown"; // or any fallback text
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

  // // Edit functions for Debt, Payment, and Buyer
  // const handleEditItem = (type, item) => {
  //   setEditItem({ type, item });
  //   setEditDialogOpen(true);
  // };
  
  // const handleEditItem = (type, item) => {
  //   if (item.date) {
  //     item.date = formatDate(item.date);
  //   }
  //   setEditItem({ type, item });
  //   setEditDialogOpen(true);
  // };

  // const handleSaveEdit = () => {
  //   const { type, item } = editItem;
  //   const updatedCustomer = {
  //     ...customer,
  //     [type]: customer[type].map((i) => (i._id === item._id ? item : i)),
  //   };

  //   axios
  //     .put(`${apiUrl}/customers/${id}`, updatedCustomer)
  //     .then((response) => {
  //       setCustomer(response.data);
  //       setEditDialogOpen(false);
  //       setEditItem(null);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating customer:", error);
  //     });
  // };

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

  // // Function to handle printing buyer information
  // const handlePrintBuyer = (buyer) => {
  //   setSelectedBuyer(buyer);
  //   setPrintDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setPrintDialogOpen(false);
  //   setSelectedBuyer(null); // Clear selected buyer after closing
  // };

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
              <TableCell>البضاعة {/*Name*/}</TableCell>
              <TableCell>العدد {/*Count*/}</TableCell>
              <TableCell>السعر {/*price*/}</TableCell>
              <TableCell>السعر الكلي {/*total price*/}</TableCell>
              <TableCell>التاريخ {/*Date*/}</TableCell>
              <TableCell>{/*Actions*/}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.fromStore.map((store) => (
              <TableRow key={store._id}>
                {/* <TableCell>{store.name}</TableCell> */}
                <TableCell>{findProducerNameById(store.name)}</TableCell>

                {/* <TableCell>{store.name}</TableCell> */}
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
                  {/* <IconButton
                    aria-label="print"
                    title="Print Customer"
                    onClick={() => handlePrintBuyer(store)}
                  >
                    <PrintIcon />
                  </IconButton> */}
                  <IconButton
                    variant="contained"
                    color="primary"
                    sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                    onClick={() => handleDeleteItem("fromStore", store._id)}
                  >
                    <ClearIcon />
                  </IconButton>

                  {/* <IconButton
                    variant="contained"
                    color="primary"
                    sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                    onClick={() => handleEditItem("fromStore", store)}
                  >
                    <EditIcon />
                  </IconButton> */}
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
