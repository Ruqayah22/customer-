import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import AddDebt from "./CustomerDetails/AddDebt";
import AddPayment from "./CustomerDetails/AddPayment";
import AddBuyer from "./CustomerDetails/AddBuyer";
import AddStore from "./CustomerDetails/AddStore";
import DebtTable from "./CustomerDetails/DebtTable";
import PaymentTable from "./CustomerDetails/PaymentTable";
import BuyersTable from "./CustomerDetails/BuyersTable";
import StoreTable from "./CustomerDetails/StoreTable";
import DialogWrapper from "../../components/DialogWrapper";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

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
      ? "0.000"
      : parsedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`${apiUrl}/customers/${id}`);

      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditCustomer = () => {
    navigate(`/customers/${id}/edit`);
  };

  const handleOpenDialog = (dialogType) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
    window.location.reload();
  };

  if (!customer) return <Typography>Loading...</Typography>;

  const totalDebtUSD = customer.debts
    .filter((debt) => debt.currency === "$")
    .reduce((acc, debt) => acc + parseFloat(debt.amount), 0);
  const totalDebtIQD = customer.debts
    .filter((debt) => debt.currency === "IQD")
    .reduce((acc, debt) => acc + parseFloat(debt.amount), 0);

  const totalPaymentUSD = customer.payments
    .filter((payment) => payment.currency === "$")
    .reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
  const totalPaymentIQD = customer.payments
    .filter((payment) => payment.currency === "IQD")
    .reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

  const restAmountUSD = totalDebtUSD - totalPaymentUSD;
  const restAmountIQD = totalDebtIQD - totalPaymentIQD;

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
                الاسم: {customer.name}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
              >
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
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              مجموع الديون ($): {totalDebtUSD}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              مجموع الديون (IQD): {formatAmount(totalDebtIQD)}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              مجموع التسديد ($): {totalPaymentUSD}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              مجموع التسديد (IQD): {formatAmount(totalPaymentIQD)}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              الباقي ($): {restAmountUSD}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              الباقي (IQD): {formatAmount(restAmountIQD)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: "20px", direction: "rtl" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    اضافة دين
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog("debt")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    دين
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    اضافة تسديد
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("payment")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    تسديد
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    اضافة منتج
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog("buyer")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    منتج
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    من المخزن
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog("store")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    المخزن
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{ margin: "20px" }}>
          {/* debt table */}
          <Grid item xs={6}>
            <DebtTable />
          </Grid>
          {/* payment table */}
          <Grid item xs={6}>
            <PaymentTable />
          </Grid>
        </Grid>
        {/* Buyers table */}
        <BuyersTable />
        {/* store table */}
        <StoreTable />
      </Box>
      <DialogWrapper
        open={openDialog === "debt"}
        onClose={handleCloseDialog}
        title="إضافة دين"
        component={<AddDebt />}
      />
      <DialogWrapper
        open={openDialog === "payment"}
        onClose={handleCloseDialog}
        title="إضافة تسديد"
        component={<AddPayment />}
      />
      <DialogWrapper
        open={openDialog === "buyer"}
        onClose={handleCloseDialog}
        title="إضافة منتج"
        component={<AddBuyer />}
      />
      <DialogWrapper
        open={openDialog === "store"}
        onClose={handleCloseDialog}
        title="إضافة متجر"
        component={<AddStore />}
      />
    </Container>
  );
};

export default CustomerDetails;
