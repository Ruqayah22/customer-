import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_SERVER_URL;

const AddStore = () => {
const { id } = useParams();
const [customer, setCustomer] = useState(null);
  
const [newStore, setNewStore] = useState([
  {
    name: "",
    quantity: "",
    amount: "",
    currency: "",
    date: dayjs().format("YYYY-MM-DD"),
  },
]);

const [producers, setProducers] = useState([]);


const handleAddStore = () => {
  const updatedCustomer = {
    ...customer,
    FromStore: [...customer.FromStore, { ...newStore, date: newStore.date }],
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

      if (!Array.isArray(customerData.buyers)) {
        customerData.buyers = [];
      }

      setCustomer(customerData);
    })
    .catch((error) => {
      console.error("There was an error fetching the customer details!", error);
    });
}, [id]);

// const formatAmount = (amount) => {
//   const parsedAmount = parseFloat(amount);
//   return isNaN(parsedAmount)
//     ? "0.00"
//     : parsedAmount.toLocaleString("en-US", {
//         minimumFractionDigits: 3,
//         maximumFractionDigits: 3,
//       });
// };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          من المخزن
        </Typography>
        <FormControl fullWidth margin="normal">
          {/* <TextField
                  label="البضاعة" //"Name"
                  value={newStore.name}
                  onChange={(e) =>
                    setNewStore({ ...newStore, name: e.target.value })
                  }
                  variant="standard"
                  InputProps={{
                    style: { textAlign: "right" },
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
                /> */}
          <Select
            labelId="category-label"
            value={newStore.name || ""} // Updated value to reflect current state
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            displayEmpty
            sx={{ width: "200px" }}
          >
            <MenuItem disabled value="">
              <em>اختر فئة</em>
            </MenuItem>
            {producers?.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="السعر" //"price"
            value={newStore.amount || ""}
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
            value={newStore.currency || ""}
            // value={newStore.currency || "$"}
            onChange={(e) =>
              setNewStore({ ...newStore, currency: e.target.value })
            }
            variant="standard"
            sx={{
              textAlign: "right",
              "& .MuiSelect-select": {
                textAlign: "right", // Align text to the right
              },
              "&:before": {
                borderBottomColor: "#44484e", // Normal underline color
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#44484e", // Hover underline color
              },
              "&:after": {
                borderBottomColor: "#44484e", // Focused underline color
              },
            }}
          >
            <MenuItem value="$">$</MenuItem>
            <MenuItem value="IQD">IQD</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="العدد" //"quantity"
            value={newStore.quantity || ""}
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
}

export default AddStore
