import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const AddPayment = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  const [newPayment, setNewPayment] = useState({
    amount: "",
    date: dayjs().format("YYYY-MM-DD"),
  });

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

  const handleAddPayment = () => {
    const updatedCustomer = {
      ...customer,
      payments: [
        ...customer.payments,
        {
          ...newPayment,
          amount: parseFloat(newPayment.amount.replace(/,/g, "")),
          date: newPayment.date,
        },
      ],
    };
    axios
      .put(`${apiUrl}/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setNewPayment({ amount: "", date: "" });
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          {/* Add New Payment */}
          تسديد الدين
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="التسديد" //"Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                amount: e.target.value.replace(/[^0-9.]/g, ""),
              })
            }
            onBlur={(e) =>
              setNewPayment({
                ...newPayment,
                amount: formatAmount(e.target.value),
              })
            }
            variant="standard"
            InputProps={{
              style: { textAlign: "right" },
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            InputLabelProps={{ style: { right: 30, left: "auto" } }}
            sx={{
              "& .MuiInput-underline": {
                "&:before": {
                  borderBottomColor: "#44484e", // Normal underline color
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#44484e", // Hover underline color
                },
                "&:after": {
                  borderBottomColor: "#44484e", // Focused underline color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#44484e", // Normal label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#44484e", // Focused label color
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            // label="Date"
            type="date"
            value={newPayment.date}
            onChange={(e) =>
              setNewPayment({ ...newPayment, date: e.target.value })
            }
            variant="standard"
            InputProps={{ style: { textAlign: "right" } }}
            InputLabelProps={{ style: { right: 30, left: "auto" } }}
            sx={{
              "& .MuiInput-underline": {
                "&:before": {
                  borderBottomColor: "#44484e", // Normal underline color
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#44484e", // Hover underline color
                },
                "&:after": {
                  borderBottomColor: "#44484e", // Focused underline color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#44484e", // Normal label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#44484e", // Focused label color
              },
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPayment}
          sx={{
            background: "#44484e",
            fontWeight: "bold",
            fontSize: "15px",
            margin: "20px 0 10px 0",
            "&:hover": {
              backgroundColor: "#5c6169",
            },
          }}
        >
          {/* Add Payment */}
          اضافة تسديد
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddPayment;
