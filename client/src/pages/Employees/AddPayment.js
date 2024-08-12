import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const AddPayment = ({ onClose }) => {
  const { id } = useParams();

  const [payments, setPayments] = useState({
    amount: "0",
    date: dayjs().format("YYYY-MM-DD"),
  });

  const handleAddPayment = () => {
    axios
      .post(`${apiUrl}/employee/${id}/addPayment`, payments)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error adding payment:", error);
      });
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          تسديد الدين
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="التسديد"
            value={payments.amount}
            onChange={(e) =>
              setPayments({
                ...payments,
                amount: e.target.value,
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
                  borderBottomColor: "#44484e",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#44484e",
                },
                "&:after": {
                  borderBottomColor: "#44484e",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#44484e",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#44484e",
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            type="date"
            value={payments.date}
            onChange={(e) => setPayments({ ...payments, date: e.target.value })}
            variant="standard"
            InputProps={{ style: { textAlign: "right" } }}
            InputLabelProps={{ style: { right: 30, left: "auto" } }}
            sx={{
              "& .MuiInput-underline": {
                "&:before": {
                  borderBottomColor: "#44484e",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#44484e",
                },
                "&:after": {
                  borderBottomColor: "#44484e",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#44484e",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#44484e",
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
          اضافة تسديد
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddPayment;
