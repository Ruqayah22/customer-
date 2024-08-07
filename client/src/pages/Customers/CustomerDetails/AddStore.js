import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const AddStore = ({ onClose }) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [producers, setProducers] = useState([]);
  const [newStore, setNewStore] = useState({
    name: "",
    quantity: "",
    amount: "",
    currency: "",
    date: dayjs().format("YYYY-MM-DD"),
  });

  const handleAddStore = () => {
    const updatedCustomer = {
      ...customer,
      fromStore: [...customer.fromStore, { ...newStore }],
    };

    axios
      .put(`${apiUrl}/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setNewStore({
          name: "",
          amount: "",
          currency: "",
          quantity: "",
          date: dayjs().format("YYYY-MM-DD"),
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

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

    axios
      .get(`${apiUrl}/stored`)
      .then((response) => {
        setProducers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the producers!", error);
      });
  }, [id]);

  const handleProducerChange = (event) => {
    const selectedProducerId = event.target.value;
    const selectedProducer = producers.find(
      (p) => p._id === selectedProducerId
    );

    setNewStore({
      ...newStore,
      name: selectedProducerId,
      amount: selectedProducer ? selectedProducer.salePrice : "",
      currency: selectedProducer ? selectedProducer.saleCurrency : "",
    });
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          من المخزن
        </Typography>
        <FormControl fullWidth margin="normal">
          <Select
            labelId="category-label"
            value={newStore.name}
            onChange={handleProducerChange}
            displayEmpty
            sx={{ width: "200px" }}
          >
            <MenuItem disabled value="">
              <em>اختر فئة</em>
            </MenuItem>
            {producers.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="السعر"
            value={newStore.amount}
            onChange={(e) =>
              setNewStore({ ...newStore, amount: e.target.value })
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
            label="العملة"
            value={newStore.currency}
            onChange={(e) =>
              setNewStore({ ...newStore, currency: e.target.value })
            }
            variant="standard"
            InputProps={{
              style: { textAlign: "right" },
              inputMode: "text",
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
            label="العدد"
            value={newStore.quantity}
            onChange={(e) =>
              setNewStore({ ...newStore, quantity: e.target.value })
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
            value={newStore.date}
            onChange={(e) => setNewStore({ ...newStore, date: e.target.value })}
            variant="standard"
            InputProps={{ style: { textAlign: "right" } }}
            InputLabelProps={{
              style: { right: 30, left: "auto" },
              shrink: true,
            }}
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
          onClick={handleAddStore}
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
          اضافة
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddStore;
