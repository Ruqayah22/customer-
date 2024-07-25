import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const AddBuyer = ({ onClose }) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  const [newBuyer, setNewBuyer] = useState({
    name: "",
    price: "",
    currency: "",
    count: "",
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

  const handleAddBuyer = () => {
    const updatedCustomer = {
      ...customer,
      buyers: [...customer.buyers, { ...newBuyer, date: newBuyer.date }],
    };

    axios
      .put(`${apiUrl}/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setNewBuyer({
          name: "",
          price: "",
          currency: "$",
          count: "",
          date: "",
        }); // Reset newBuyer state
        onClose();
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          اضافة بضاعة
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="البضاعة"
            value={newBuyer.name}
            onChange={(e) => setNewBuyer({ ...newBuyer, name: e.target.value })}
            variant="standard"
            InputProps={{
              style: { textAlign: "right" },
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
            label="السعر"
            value={newBuyer.price}
            onChange={(e) =>
              setNewBuyer({ ...newBuyer, price: e.target.value })
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
          <InputLabel
            style={{ right: 30, left: "auto" }}
            sx={{
              color: "#44484e",
              "&.Mui-focused": {
                color: "#44484e",
              },
              right: 30,
              left: "auto",
            }}
          >
            العملة
          </InputLabel>
          <Select
            value={newBuyer.currency}
            onChange={(e) =>
              setNewBuyer({ ...newBuyer, currency: e.target.value })
            }
            variant="standard"
            sx={{
              textAlign: "right",
              "& .MuiSelect-select": {
                textAlign: "right",
              },
              "&:before": {
                borderBottomColor: "#44484e",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#44484e",
              },
              "&:after": {
                borderBottomColor: "#44484e",
              },
            }}
          >
            <MenuItem value="$">$</MenuItem>
            <MenuItem value="IQD">IQD</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="العدد"
            value={newBuyer.count}
            onChange={(e) =>
              setNewBuyer({ ...newBuyer, count: e.target.value })
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
            value={newBuyer.date}
            onChange={(e) => setNewBuyer({ ...newBuyer, date: e.target.value })}
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
          onClick={handleAddBuyer}
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
          اضافة بضاعة
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddBuyer;
