import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  // Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  Typography,
  // TextField,
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import dayjs from "dayjs";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
// import PrintIcon from "@mui/icons-material/Print";

// import PrintDialog from "../PrintDialog";
// import { getProducer } from "../../../api/StoredApi";
import AddDebt from "./AddDebt";
import AddPayment from "./AddPayment";
import AddBuyer from "./AddBuyer";
import AddStore from "./AddStore";
import DebtTable from "./DebtTable";
import PaymentTable from "./PaymentTable";
import BuyersTable from "./BuyersTable";
import StoreTable from "./StoreTable";

const apiUrl = process.env.REACT_APP_SERVER_URL;


const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  
  
  // const [editItem, setEditItem] = useState(null);
  // const [editDialogOpen, setEditDialogOpen] = useState(false);

  // const [printDialogOpen, setPrintDialogOpen] = useState(false);
  // const [selectedBuyer, setSelectedBuyer] = useState(null);

  // const [producers, setProducers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/customers/${id}`)
      .then((response) => {
        const customerData = response.data;

        if (!Array.isArray(customerData.buyers)) {
          customerData.buyers = [];
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

  // useEffect(() => {
  //   getAllProducer();
  // }, []);

  // const getAllProducer = async () => {
  //   let response = await getProducer();
  //   setProducers(response.data);
  // };

  // // Function to find the producer by ID
  // const findProducerNameById = (id) => {
  //   const producer = producers.find((p) => p._id === id);
  //   return producer ? producer.type : "Unknown"; // or any fallback text
  // };

  const calculateTotalDebt = () => {
    let totalDebt = 0;
    if (customer && Array.isArray(customer.debts)) {
      totalDebt = customer.debts.reduce(
        (acc, debt) => acc + parseFloat(debt.amount),
        0
      );
    }
    return formatAmount(totalDebt);
  };

  const calculateTotalPayment = () => {
    let totalPayment = 0;
    if (customer && Array.isArray(customer.payments)) {
      totalPayment = customer.payments.reduce(
        (acc, payment) => acc + parseFloat(payment.amount),
        0
      );
    }
    return formatAmount(totalPayment);
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`${apiUrl}/customers/${id}`);
      console.log("Customer deleted successfully");

      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditCustomer = () => {
    navigate(`/customers/${id}/edit`);
  };

  // // Delete functions for Debt, Payment, and Buyer
  // const handleDeleteItem = (type, itemId) => {
  //   const updatedCustomer = {
  //     ...customer,
  //     [type]: customer[type].filter((item) => item._id !== itemId),
  //   };

  //   axios
  //     .put(`${apiUrl}/customers/${id}`, updatedCustomer)
  //     .then((response) => {
  //       setCustomer(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating customer:", error);
  //     });
  // };

  // // Edit functions for Debt, Payment, and Buyer
  // const handleEditItem = (type, item) => {
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

  // const formatDate = (date) => {
  //   return dayjs(date).format("YYYY-MM-DD");
  // };

  const calculateRestAmount = () => {
    const restAmount =
      calculateTotalDebt().replace(/,/g, "") -
      calculateTotalPayment().replace(/,/g, "");
    return formatAmount(restAmount);
  };

  if (!customer) return <Typography>Loading...</Typography>;

  // function formatCurrency(amount, currency) {
  //   switch (currency) {
  //     case "$":
  //       return `$${amount}`;
  //     case "IQD":
  //       return `${formatAmount(amount)} IQD`;
  //     default:
  //       return `${amount.toFixed(2)}`;
  //   }
  // }

  // // Function to handle printing buyer information
  // const handlePrintBuyer = (buyer) => {
  //   setSelectedBuyer(buyer);
  //   setPrintDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setPrintDialogOpen(false);
  //   setSelectedBuyer(null); // Clear selected buyer after closing
  // };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          textAlign: "center",
          fontWeight: "bold",
          margin: "30px 0 10px 0",
        }}
      >
        {/* Customer Information */}
        معلومات الزبون
      </Typography>
      <Box sx={{ width: "100%", margin: "20px", direction: "rtl" }}>
        <Box
          sx={{
            width: "100%",
            margin: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginRight: "20px",
            }}
          >
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
              >
                {/* Name: {customer.name} */}
                الاسم: {customer.name}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
              >
                {/* Phone: {customer.phoneNumber} */}
                رقم الهاتف: {customer.phoneNumber}
              </Typography>
              <Box>
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  onClick={handleDeleteCustomer}
                >
                  <ClearIcon />
                </IconButton>

                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  onClick={handleEditCustomer}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginButton: "20px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              {/* Total Debt: {calculateTotalDebt()} */}
              مجموع الديون: {calculateTotalDebt()}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              {/* Total Payment: {calculateTotalPayment()} */}
              مجموع التسديد: {calculateTotalPayment()}
            </Typography>
            {/* الباقي */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              {/* Rest: {calculateRestAmount()} */}
              الباقي: {calculateRestAmount()}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* add debt */}
          <AddDebt/>
          {/* add Payment */}
          <AddPayment/>
          {/* add Buyer */}
          <AddBuyer/>
          {/* from store form */}
          <AddStore/>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {/* debt table */}
          <DebtTable/>
          {/* payment table */}
          <PaymentTable/>
        </Grid>
        {/* Buyers table */}
        <BuyersTable/>
        {/* store table */}
        <StoreTable/>
      </Box>
      
    </Container>
  );
};

export default CustomerDetails;
