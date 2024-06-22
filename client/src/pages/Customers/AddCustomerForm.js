// src/components/AddCustomer.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  // IconButton,
  Box,
} from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

function AddCustomer() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [debts, setDebts] = useState([{ amount: "", date: "" }]);
  const [payments, setPayments] = useState([{ amount: "", date: "" }]);
  const [buyers, setBuyers] = useState([{ name: "", count: "", date: "" }]);
  const navigate = useNavigate();

  const handleDebtChange = (index, field, value) => {
    const newDebts = [...debts];
    newDebts[index][field] = value;
    setDebts(newDebts);
  };

  const handlePaymentChange = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const handleBuyerChange = (index, field, value) => {
    const newBuyers = [...buyers];
    newBuyers[index][field] = value;
    setBuyers(newBuyers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { name, phoneNumber, debts, payments, buyers };
    try {
      await axios.post("http://localhost:8000/customers", customer);
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the customer!", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Customer
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                Debts
              </Typography>
              {debts.map((debt, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="Amount"
                      type="number"
                      fullWidth
                      value={debt.amount}
                      onChange={(e) =>
                        handleDebtChange(index, "amount", e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={debt.date}
                      onChange={(e) =>
                        handleDebtChange(index, "date", e.target.value)
                      }
                      required
                    />
                  </Grid>
                </Grid>
              ))}
              {/* <Box mt={2}>
                <IconButton
                  color="primary"
                  onClick={() => setDebts([...debts, { amount: "", date: "" }])}
                >
                  <AddIcon />
                </IconButton>
              </Box> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                Payments
              </Typography>
              {payments.map((payment, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="Amount"
                      type="number"
                      fullWidth
                      value={payment.amount}
                      onChange={(e) =>
                        handlePaymentChange(index, "amount", e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={payment.date}
                      onChange={(e) =>
                        handlePaymentChange(index, "date", e.target.value)
                      }
                      required
                    />
                  </Grid>
                </Grid>
              ))}
              {/* <Box mt={2}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setPayments([...payments, { amount: "", date: "" }])
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                Buyers
              </Typography>
              {buyers.map((buyer, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}>
                    <TextField
                      label="Name"
                      fullWidth
                      value={buyer.name}
                      onChange={(e) =>
                        handleBuyerChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Count"
                      type="number"
                      fullWidth
                      value={buyer.count}
                      onChange={(e) =>
                        handleBuyerChange(index, "count", e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={buyer.date}
                      onChange={(e) =>
                        handleBuyerChange(index, "date", e.target.value)
                      }
                      required
                    />
                  </Grid>
                </Grid>
              ))}
              {/* <Box mt={2}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setBuyers([...buyers, { name: "", count: "", date: "" }])
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box> */}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddCustomer;
