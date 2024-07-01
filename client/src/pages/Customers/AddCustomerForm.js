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
  InputLabel,
  Select,
  MenuItem,
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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            textAlign: "right",
            fontWeight: "bold",
            // color: "#80868e",
            margin: "10px 0 30px 0",
          }}
        >
          {/* Add Customer */}
          اضافة زبون
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} style={{ direction: "rtl" }}>
            <Grid item xs={12}>
              <TextField
                label="الاسم" //"Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variant="standard"
                InputProps={{ style: { textAlign: "right" } }}
                InputLabelProps={{ style: { right: 30, left: "auto" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="رقم الهاتف" //"Phone Number"
                fullWidth
                variant="standard"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                InputProps={{ style: { textAlign: "right" } }}
                InputLabelProps={{ style: { right: 30, left: "auto" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                {/* Debts */}
                الديون
              </Typography>
              {debts.map((debt, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="الدين" //"Amount"
                      type="number"
                      fullWidth
                      variant="standard"
                      value={debt.amount}
                      onChange={(e) =>
                        handleDebtChange(index, "amount", e.target.value)
                      }
                      required
                      InputProps={{ style: { textAlign: "right" } }}
                      InputLabelProps={{ style: { right: 30, left: "auto" } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="تاريخ الدين"
                      type="date"
                      fullWidth
                      value={debt.date}
                      onChange={(e) =>
                        handleDebtChange(index, "date", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
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
                {/* Payments */}
                التسديد
              </Typography>
              {payments.map((payment, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="التسديد" //"Amount"
                      type="number"
                      fullWidth
                      value={payment.amount}
                      onChange={(e) =>
                        handlePaymentChange(index, "amount", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="تاريخ التسديد"
                      type="date"
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                      value={payment.date}
                      onChange={(e) =>
                        handlePaymentChange(index, "date", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
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
                {/* Buyers */}
                البضاعة
              </Typography>
              {buyers.map((buyer, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}>
                    <TextField
                      label="البضاعة" //"Name"
                      fullWidth
                      value={buyer.name}
                      onChange={(e) =>
                        handleBuyerChange(index, "name", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="العدد" //"Count"
                      type="number"
                      fullWidth
                      value={buyer.count}
                      onChange={(e) =>
                        handleBuyerChange(index, "count", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="السعر" //"price"
                      value={buyer.price}
                      onChange={(e) =>
                        handleBuyerChange(index, "price", e.target.value)
                      }
                      variant="standard"
                      InputProps={{
                        style: { textAlign: "right" },
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      InputLabelProps={{ style: { right: 30, left: "auto" } }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={2} marginTop={"2px"}>
                      <Grid item xs={6} md={4}>
                        <InputLabel style={{ right: 30, left: "auto", margin: "10px" }}>
                          العملة
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Select
                          label="العملة"
                          value={buyer.currency}
                          onChange={(e) =>
                            handleBuyerChange(index, "currency", e.target.value)
                          }
                          variant="standard"
                          sx={{ textAlign: "right" }}
                        >
                          <MenuItem value="$">$</MenuItem>
                          <MenuItem value="IQD">IQD</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="التاريخ" //"Date"
                      type="date"
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                      value={buyer.date}
                      onChange={(e) =>
                        handleBuyerChange(index, "date", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
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
                sx={{
                  background: "#44484e",
                  fontWeight: "bold",
                  fontSize: "22px",
                  "&:hover": {
                    backgroundColor: "#5c6169", // Background color on hover
                  },
                }}
              >
                {/* Add Customer */}
                اضافة زبون
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddCustomer;
